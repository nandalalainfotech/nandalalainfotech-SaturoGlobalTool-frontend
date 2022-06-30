import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { BioTypeManager } from 'src/app/shared/services/restcontroller/bizservice/type.service';
import { Type001mb } from 'src/app/shared/services/restcontroller/entities/Type001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-bio-system-types',
  templateUrl: './bio-system-types.component.html',
  styleUrls: ['./bio-system-types.component.css']
})
export class BioSystemTypesComponent implements OnInit {

  public BioSystemTypesForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  type: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  types: Type001mb [] = [];
  

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;


  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private bioTypeManager: BioTypeManager,
  ) { 
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.createDataGrid001();

    this.BioSystemTypesForm = this.formBuilder.group({
      type: ['', Validators.required], 
    });

    this.loadData();
  }

  loadData() {
    this.bioTypeManager.allbioType().subscribe(response => {
      this.types = deserialize<Type001mb[]>(Type001mb, response);
      if (this.types.length > 0) {
        this.gridOptions?.api?.setRowData(this.types);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }


  get f() { return this.BioSystemTypesForm.controls; }

  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: 'SL-No',
        field: 'id',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Types',
        field: 'type',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 80,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'left' },
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
        },
      },
      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 85,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'left' },
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },
      {
        headerName: 'Audit',
        cellRenderer: 'iconRenderer',
        width: 80,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'left' },
        cellRendererParams: {
          onClick: this.onAuditButtonClick.bind(this),
          label: 'Audit'
        },
      },
    ];
  }

  onEditButtonClick(params: any) {
    this.id = params.data.id;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.BioSystemTypesForm.patchValue({
      'type': params.data.type,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Types";
    modalRef.componentInstance.description = "Are you sure want to delete this Type ?";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.bioTypeManager.bioTypedelete(params.data.id).subscribe((response) => {
          for (let i = 0; i < this.types.length; i++) {
            if (this.types[i].id == params.data.id) {
              this.types?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Biological-System (types) Details Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Types";
    modalRef.componentInstance.details = params.data;
  }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onbioSystemClick(event: any, BioSystemTypesForm: any) {
    this.markFormGroupTouched(this.BioSystemTypesForm);
    this.submitted = true;
    if (this.BioSystemTypesForm.invalid) {
      return;
    }


    let type001mb = new Type001mb();

    type001mb.type = this.f.type.value ? this.f.type.value : "";   
    if (this.id) {
      type001mb.id = this.id;
      type001mb.insertUser = this.insertUser;
      type001mb.insertDatetime = this.insertDatetime;
      type001mb.updatedUser = this.authManager.getcurrentUser.username;
      type001mb.updatedDatetime = new Date();
      this.bioTypeManager.bioTypeupdate(type001mb).subscribe((response) => {
        this.calloutService.showSuccess("Biological-System (types) Details Updated Successfully");
        this.BioSystemTypesForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      type001mb.insertUser = this.authManager.getcurrentUser.username;
      type001mb.insertDatetime = new Date();
      this.bioTypeManager.bioTypesave(type001mb).subscribe((response) => {
        this.calloutService.showSuccess("Biological-System (types) Details Saved Successfully");
        this.BioSystemTypesForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }



  }

  onReset() {
    this.submitted = false;
    this.BioSystemTypesForm.reset();
  }

}

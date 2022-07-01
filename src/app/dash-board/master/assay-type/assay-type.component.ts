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
import { AssayTypeManager } from 'src/app/shared/services/restcontroller/bizservice/assayType.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Assaytype001mb } from 'src/app/shared/services/restcontroller/entities/Assaytype001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-assay-type',
  templateUrl: './assay-type.component.html',
  styleUrls: ['./assay-type.component.css']
})
export class AssayTypeComponent implements OnInit {

  public AssaytypeForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  assayType: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  assay: Assaytype001mb [] = [];

  

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

 

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private router: Router,
    private modalService: NgbModal,
    private assayTypeManager: AssayTypeManager,
  ) { 
    
      this.frameworkComponents = {
        iconRenderer: IconRendererComponent
      }
  }

  ngOnInit(): void {

    this.createDataGrid001();

    this.AssaytypeForm = this.formBuilder.group({
      assayType: ['', Validators.required], 
    });

    this.loadData();
  }


  loadData() {
    this.assayTypeManager.allassayType().subscribe(response => {
      this.assay = deserialize<Assaytype001mb[]>(Assaytype001mb, response);
      if (this.assay.length > 0) {
        this.gridOptions?.api?.setRowData(this.assay);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }

  get f() { return this.AssaytypeForm.controls; }

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
        headerName: 'Assay-Type',
        field: 'assayType',
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
    this.AssaytypeForm.patchValue({
      'assayType': params.data.assayType,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "assayType";
    modalRef.componentInstance.description = "Are you sure want to delete Assay Type ?";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.assayTypeManager.assayTypedelete(params.data.id).subscribe((response) => {
          for (let i = 0; i < this.assay.length; i++) {
            if (this.assay[i].id == params.data.id) {
              this.assay?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Assay Type Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "assayType";
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

  onAssaytypeClick(event: any, LigandversionForm: any) {
    this.markFormGroupTouched(this.AssaytypeForm);
    this.submitted = true;
    if (this.AssaytypeForm.invalid) {
      return;
    }


    let assaytype001mb = new Assaytype001mb();

    assaytype001mb.assayType = this.f.assayType.value ? this.f.assayType.value : "";   
    if (this.id) {
      assaytype001mb.id = this.id;
      assaytype001mb.insertUser = this.insertUser;
      assaytype001mb.insertDatetime = this.insertDatetime;
      assaytype001mb.updatedUser = this.authManager.getcurrentUser.username;
      assaytype001mb.updatedDatetime = new Date();
      this.assayTypeManager.assayTypeupdate(assaytype001mb).subscribe((response) => {
        this.calloutService.showSuccess("Assay Type Details Updated Successfully");
        this.AssaytypeForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      assaytype001mb.insertUser = this.authManager.getcurrentUser.username;
      assaytype001mb.insertDatetime = new Date();
      this.assayTypeManager.assayTypesave(assaytype001mb).subscribe((response) => {
        this.calloutService.showSuccess("Assay Type Details Saved Successfully");
        this.AssaytypeForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }


  }

  onReset() {
    this.submitted = false;
    this.AssaytypeForm.reset();
  }

}

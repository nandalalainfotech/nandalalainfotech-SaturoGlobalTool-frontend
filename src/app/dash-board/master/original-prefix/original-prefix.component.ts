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
import { OriginalprefixManager } from 'src/app/shared/services/restcontroller/bizservice/originalPrefix.service';
import { Originalprefix001mb } from 'src/app/shared/services/restcontroller/entities/Originalprefix001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-original-prefix',
  templateUrl: './original-prefix.component.html',
  styleUrls: ['./original-prefix.component.css']
})
export class OriginalPrefixComponent implements OnInit {

  public OriginalPrefixForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  originalPrefix: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  Originals: Originalprefix001mb [] = [];
  

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private originalprefixManager: OriginalprefixManager,
  ) { 
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.createDataGrid001();
    
    this.OriginalPrefixForm = this.formBuilder.group({
      originalPrefix: ['', Validators.required],
    });

    this.loadData();
  }

  loadData() {
    this.originalprefixManager.alloriginalPrefix().subscribe(response => {
      this.Originals = deserialize<Originalprefix001mb[]>(Originalprefix001mb, response);
      if (this.Originals.length > 0) {
        this.gridOptions?.api?.setRowData(this.Originals);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }

  get f() { return this.OriginalPrefixForm.controls; }


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
        headerName: 'Original Prefix',
        field: 'originalPrefix',
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
    this.OriginalPrefixForm.patchValue({
      'originalPrefix': params.data.originalPrefix,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "OriginalPrefix";
    modalRef.componentInstance.description = "Are you sure want to delete OrigionalPrefix ?";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.originalprefixManager.originalPrefixdelete(params.data.id).subscribe((response) => {
          for (let i = 0; i < this.Originals.length; i++) {
            if (this.Originals[i].id == params.data.id) {
              this.Originals?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Original Prefix Details Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "OriginalPrefix";
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

  onOrginialPrefixClick(event: any, OriginalPrefixForm: any) {
    this.markFormGroupTouched(this.OriginalPrefixForm);
    this.submitted = true;
    if (this.OriginalPrefixForm.invalid) {
      return;
    }

    let originalprefix001mb = new Originalprefix001mb();

    originalprefix001mb.originalPrefix = this.f.originalPrefix.value ? this.f.originalPrefix.value : "";   
    if (this.id) {
      originalprefix001mb.id = this.id;
      originalprefix001mb.insertUser = this.insertUser;
      originalprefix001mb.insertDatetime = this.insertDatetime;
      originalprefix001mb.updatedUser = this.authManager.getcurrentUser.username;
      originalprefix001mb.updatedDatetime = new Date();
      this.originalprefixManager.originalPrefixupdate(originalprefix001mb).subscribe((response) => {
        this.calloutService.showSuccess("Original Prefix Details Updated Successfully");
        this.OriginalPrefixForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      originalprefix001mb.insertUser = this.authManager.getcurrentUser.username;
      originalprefix001mb.insertDatetime = new Date();
      this.originalprefixManager.originalPrefixsave(originalprefix001mb).subscribe((response) => {
        this.calloutService.showSuccess("Original Prefix Details Saved Successfully");
        this.OriginalPrefixForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }



  }

  onReset() {
    this.submitted = false;
    this.OriginalPrefixForm.reset();
  }

}

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
import { UnitlowendvalueManager } from 'src/app/shared/services/restcontroller/bizservice/Unitlowendvalue.service';
import { Unitlowendvalue001mb } from 'src/app/shared/services/restcontroller/entities/Unitlowendvalue001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-unit-lvalue',
  templateUrl: './unit-lvalue.component.html',
  styleUrls: ['./unit-lvalue.component.css']
})
export class UnitLvalueComponent implements OnInit {

  public UnitLowendForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  united: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  unitlowendvalue001: Unitlowendvalue001mb[] = [];

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  constructor( private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private router: Router,
    private modalService: NgbModal,
    private unitlowendvalueManager: UnitlowendvalueManager,) { 
      this.frameworkComponents = {
        iconRenderer: IconRendererComponent
      }
    }

  ngOnInit(): void {

    this.createDataGrid001()

    this.UnitLowendForm = this.formBuilder.group({
      united: ['', Validators.required],
    });

    this.loadData();
  }

  loadData() {
    this.unitlowendvalueManager.allunitlowendvalue().subscribe(response => {
      this.unitlowendvalue001 = deserialize<Unitlowendvalue001mb[]>(Unitlowendvalue001mb, response);
      if (this.unitlowendvalue001.length > 0) {
        this.gridOptions?.api?.setRowData(this.unitlowendvalue001);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }


  get f() { return this.UnitLowendForm.controls; }

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
        headerName: 'Unit(lowValue)',
        field: 'united',
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
    this.UnitLowendForm.patchValue({
      'united': params.data.united,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "UnitLowValue";
    modalRef.componentInstance.description = "Are you sure want to delete UnitLowValue ?";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.unitlowendvalueManager.unitlowendvaluedelete(params.data.id).subscribe((response) => {
          for (let i = 0; i < this.unitlowendvalue001.length; i++) {
            if (this.unitlowendvalue001[i].id == params.data.id) {
              this.unitlowendvalue001?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Unit (Low-EndValue) Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "UnitLowValue";
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

  onUnitUnitHigendvalueClick(event: any, UnitLowendForm: any) {
    this.markFormGroupTouched(this.UnitLowendForm);
    this.submitted = true;
    if (this.UnitLowendForm.invalid) {
      return;
    }

    let unitlowendvalue001mb = new Unitlowendvalue001mb();

    unitlowendvalue001mb.united = this.f.united.value ? this.f.united.value : "";
    if (this.id) {
      unitlowendvalue001mb.id = this.id;
      unitlowendvalue001mb.insertUser = this.insertUser;
      unitlowendvalue001mb.insertDatetime = this.insertDatetime;
      unitlowendvalue001mb.updatedUser = this.authManager.getcurrentUser.username;
      unitlowendvalue001mb.updatedDatetime = new Date();
      this.unitlowendvalueManager.unitlowendvalueupdate(unitlowendvalue001mb).subscribe((response) => {
        this.calloutService.showSuccess("Unit (Low-EndValue) Updated Successfully");
        this.UnitLowendForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      unitlowendvalue001mb.insertUser = this.authManager.getcurrentUser.username;
      unitlowendvalue001mb.insertDatetime = new Date();
      this.unitlowendvalueManager.unitlowendvaluesave(unitlowendvalue001mb).subscribe((response) => {
        this.calloutService.showSuccess("Unit (Low-EndValue) Saved Successfully");
        this.UnitLowendForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }

  }

  onReset() {
    this.submitted = false;
    this.UnitLowendForm.reset();
  }
}

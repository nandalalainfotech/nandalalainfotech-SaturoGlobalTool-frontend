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
import { UnitSingleValueManager } from 'src/app/shared/services/restcontroller/bizservice/unitSingleValue.service';
import { Unitsinglevalue001mb } from 'src/app/shared/services/restcontroller/entities/Unitsinglevalue001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-unit-svalue',
  templateUrl: './unit-svalue.component.html',
  styleUrls: ['./unit-svalue.component.css']
})
export class UnitSvalueComponent implements OnInit {

  public UnitSingleForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  unit: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  unitsinglevalue001: Unitsinglevalue001mb[] = [];

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private router: Router,
    private modalService: NgbModal,
    private unitSingleValueManager: UnitSingleValueManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.createDataGrid001()
    this.UnitSingleForm = this.formBuilder.group({
      unit: ['', Validators.required],
    });

    this.loadData();
  }




  loadData() {
    this.unitSingleValueManager.allunitSingleValue().subscribe(response => {
      this.unitsinglevalue001 = deserialize<Unitsinglevalue001mb[]>(Unitsinglevalue001mb, response);
      if (this.unitsinglevalue001.length > 0) {
        this.gridOptions?.api?.setRowData(this.unitsinglevalue001);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }


  get f() { return this.UnitSingleForm.controls; }

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
        headerName: 'Unit(singleValue)',
        field: 'unit',
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
    this.UnitSingleForm.patchValue({
      'unit': params.data.unit,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "UnitSingleValue";
    modalRef.componentInstance.description = "Are you sure want to delete Unit Single Value ?";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.unitSingleValueManager.unitSingleValuedelete(params.data.id).subscribe((response) => {
          for (let i = 0; i < this.unitsinglevalue001.length; i++) {
            if (this.unitsinglevalue001[i].id == params.data.id) {
              this.unitsinglevalue001?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Unit (SingleValue) Details Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "UnitSingleValue";
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

  onUnitSinglevalueClick(event: any, UnitSingleForm: any) {
    this.markFormGroupTouched(this.UnitSingleForm);
    this.submitted = true;
    if (this.UnitSingleForm.invalid) {
      return;
    }


    let unitsinglevalue001mb = new Unitsinglevalue001mb();

    unitsinglevalue001mb.unit = this.f.unit.value ? this.f.unit.value : "";
    if (this.id) {
      unitsinglevalue001mb.id = this.id;
      unitsinglevalue001mb.insertUser = this.insertUser;
      unitsinglevalue001mb.insertDatetime = this.insertDatetime;
      unitsinglevalue001mb.updatedUser = this.authManager.getcurrentUser.username;
      unitsinglevalue001mb.updatedDatetime = new Date();
      this.unitSingleValueManager.unitSingleValueupdate(unitsinglevalue001mb).subscribe((response) => {
        this.calloutService.showSuccess("Unit (SingleValue) Details Updated Successfully");
        this.UnitSingleForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      unitsinglevalue001mb.insertUser = this.authManager.getcurrentUser.username;
      unitsinglevalue001mb.insertDatetime = new Date();
      this.unitSingleValueManager.unitSingleValuesave(unitsinglevalue001mb).subscribe((response) => {
        this.calloutService.showSuccess("Unit (SingleValue) Details Saved Successfully");
        this.UnitSingleForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }


  }

  onReset() {
    this.submitted = false;
    this.UnitSingleForm.reset();
  }
}

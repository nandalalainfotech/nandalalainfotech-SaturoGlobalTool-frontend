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
import { RouteofAdminManager } from 'src/app/shared/services/restcontroller/bizservice/routeOfAdministration.service';
import { ToxicityManager } from 'src/app/shared/services/restcontroller/bizservice/toxiCity.service';
import { Routeofadministration001mb } from 'src/app/shared/services/restcontroller/entities/Routeofadministration001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-route-of-administration-type',
  templateUrl: './route-of-administration-type.component.html',
  styleUrls: ['./route-of-administration-type.component.css']
})
export class RouteOfAdministrationTypeComponent implements OnInit {

  public ROAtypeForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  route: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  routeAdmin: Routeofadministration001mb [] = [];

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private routeofAdminManager: RouteofAdminManager,
  ) { 
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.createDataGrid001();

    this.ROAtypeForm = this.formBuilder.group({
      route: ['', Validators.required],
      
    });

    this.loadData();

   
  }

  loadData() {
    this.routeofAdminManager.allrouteofadminType().subscribe(response => {
      this.routeAdmin = deserialize<Routeofadministration001mb[]>(Routeofadministration001mb, response);
      if (this.routeAdmin.length > 0) {
        this.gridOptions?.api?.setRowData(this.routeAdmin);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }


  get f() { return this.ROAtypeForm.controls; }


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
        headerName: 'Route-of-Administration',
        field: 'route',
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
    this.ROAtypeForm.patchValue({
      'route': params.data.route,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "toxiCity";
    modalRef.componentInstance.description = "Are you sure want to delete Routes ?";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.routeofAdminManager.routeofadminTypedelete(params.data.id).subscribe((response) => {
          for (let i = 0; i < this.routeAdmin.length; i++) {
            if (this.routeAdmin[i].id == params.data.id) {
              this.routeAdmin?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Route Details Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "toxiCityType";
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

  onROAtypeFormClick(event: any, ToxixtytypeForm: any) {
    this.markFormGroupTouched(this.ROAtypeForm);
    this.submitted = true;
    if (this.ROAtypeForm.invalid) {
      return;
    }

    let routeofadministration001mb = new Routeofadministration001mb();

    routeofadministration001mb.route = this.f.route.value ? this.f.route.value : "";   
    if (this.id) {
      routeofadministration001mb.id = this.id;
      routeofadministration001mb.insertUser = this.insertUser;
      routeofadministration001mb.insertDatetime = this.insertDatetime;
      routeofadministration001mb.updatedUser = this.authManager.getcurrentUser.username;
      routeofadministration001mb.updatedDatetime = new Date();
      this.routeofAdminManager.routeofadminTypeupdate(routeofadministration001mb).subscribe((response) => {
        this.calloutService.showSuccess("Route Details Updated Successfully");
        this.ROAtypeForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      routeofadministration001mb.insertUser = this.authManager.getcurrentUser.username;
      routeofadministration001mb.insertDatetime = new Date();
      this.routeofAdminManager.routeofadminTypesave(routeofadministration001mb).subscribe((response) => {
        this.calloutService.showSuccess("Route Details Saved Successfully");
        this.ROAtypeForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }




  }

  onReset() {
    this.submitted = false;
    this.ROAtypeForm.reset();
  }

}

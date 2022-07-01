import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { ToxicityManager } from 'src/app/shared/services/restcontroller/bizservice/toxiCity.service';
import { Toxicity001mb } from 'src/app/shared/services/restcontroller/entities/Toxicity001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-toxicity-type',
  templateUrl: './toxicity-type.component.html',
  styleUrls: ['./toxicity-type.component.css']
})
export class ToxicityTypeComponent implements OnInit {

  public ToxixtytypeForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  toxiCity: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  toxi: Toxicity001mb [] = [];

  
  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

 

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private toxicityManager: ToxicityManager,
  ) { 

    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }



  ngOnInit(): void {

    this.createDataGrid001();

    this.ToxixtytypeForm = this.formBuilder.group({
      toxiCity: ['', Validators.required],
    });

    this.loadData();
  }

  loadData() {
    this.toxicityManager.alltoxicityType().subscribe(response => {
      this.toxi = deserialize<Toxicity001mb[]>(Toxicity001mb, response);
      if (this.toxi.length > 0) {
        this.gridOptions?.api?.setRowData(this.toxi);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }


  get f() { return this.ToxixtytypeForm.controls; }

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
        headerName: 'Toxicity-Type',
        field: 'toxiCity',
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
    this.ToxixtytypeForm.patchValue({
      'toxiCity': params.data.toxiCity,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "toxiCity";
    modalRef.componentInstance.description = "Are you sure want to delete Toxicity ?";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.toxicityManager.toxicityTypedelete(params.data.id).subscribe((response) => {
          for (let i = 0; i < this.toxi.length; i++) {
            if (this.toxi[i].id == params.data.id) {
              this.toxi?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Toxicity Type Removed Successfully");
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

  onToxixtytypeClick(event: any, ToxixtytypeForm: any) {
    this.markFormGroupTouched(this.ToxixtytypeForm);
    this.submitted = true;
    if (this.ToxixtytypeForm.invalid) {
      return;
    }

    let toxicity001mb = new Toxicity001mb();

    toxicity001mb.toxiCity = this.f.toxiCity.value ? this.f.toxiCity.value : "";   
    if (this.id) {
      toxicity001mb.id = this.id;
      toxicity001mb.insertUser = this.insertUser;
      toxicity001mb.insertDatetime = this.insertDatetime;
      toxicity001mb.updatedUser = this.authManager.getcurrentUser.username;
      toxicity001mb.updatedDatetime = new Date();
      this.toxicityManager.toxicityTypeupdate(toxicity001mb).subscribe((response) => {
        this.calloutService.showSuccess("Toxicity Details Updated Successfully");
        this.ToxixtytypeForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      toxicity001mb.insertUser = this.authManager.getcurrentUser.username;
      toxicity001mb.insertDatetime = new Date();
      this.toxicityManager.toxicityTypesave(toxicity001mb).subscribe((response) => {
        this.calloutService.showSuccess("Toxicity Details Saved Successfully");
        this.ToxixtytypeForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }



  }

  onReset() {
    this.submitted = false;
    this.ToxixtytypeForm.reset();
  }
}

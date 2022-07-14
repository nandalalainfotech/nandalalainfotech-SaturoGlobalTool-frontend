import { Component, HostBinding, OnInit } from '@angular/core';
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
import { LigandTypeManager } from 'src/app/shared/services/restcontroller/bizservice/ligandType.service';
import { Ligandtype001mb } from 'src/app/shared/services/restcontroller/entities/Ligandtype001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-ligand-type',
  templateUrl: './ligand-type.component.html',
  styleUrls: ['./ligand-type.component.css']
})
export class LigandTypeComponent implements OnInit {

  public LigandtypeForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  ligandtype: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  ligandtype001: Ligandtype001mb [] = [];
  user?: User001mb;
  hexToRgb: any;
  rgbToHex: any;
  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;
  

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

 
  constructor(

    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private router: Router,
    private modalService: NgbModal,
    private ligandTypeManager: LigandTypeManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }

   }

  ngOnInit(): void {

    this.createDataGrid001();

    this.LigandtypeForm = this.formBuilder.group({
      ligandtype: ['', Validators.required],
    });


    this.loadData();
    this.authManager.currentUserSubject.subscribe((object: any) => {
      this.user = object;

      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });
  }

  loadData() {
    this.ligandTypeManager.allligandType().subscribe(response => {
      this.ligandtype001 = deserialize<Ligandtype001mb[]>(Ligandtype001mb, response);
      if (this.ligandtype001.length > 0) {
        this.gridOptions?.api?.setRowData(this.ligandtype001);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }

  get f() { return this.LigandtypeForm.controls; }


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
        headerName: 'Ligand-Type',
        field: 'ligandtype',
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
    this.LigandtypeForm.patchValue({
      'ligandtype': params.data.ligandtype,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "LigandType";
    modalRef.componentInstance.description = "Are you sure want to delete LigandType ?";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.ligandTypeManager.ligandTypedelete(params.data.id).subscribe((response) => {
          for (let i = 0; i < this.ligandtype001.length; i++) {
            if (this.ligandtype001[i].id == params.data.id) {
              this.ligandtype001?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("LigandType Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "LigandType";
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

  onLigandtypeClick(event: any, LigandversionForm: any) {
    this.markFormGroupTouched(this.LigandtypeForm);
    this.submitted = true;
    if (this.LigandtypeForm.invalid) {
      return;
    }

    let ligandtype001mb = new Ligandtype001mb();

    ligandtype001mb.ligandtype = this.f.ligandtype.value ? this.f.ligandtype.value : "";   
    if (this.id) {
      ligandtype001mb.id = this.id;
      ligandtype001mb.insertUser = this.insertUser;
      ligandtype001mb.insertDatetime = this.insertDatetime;
      ligandtype001mb.updatedUser = this.authManager.getcurrentUser.username;
      ligandtype001mb.updatedDatetime = new Date();
      this.ligandTypeManager.ligandTypeupdate(ligandtype001mb).subscribe((response) => {
        this.calloutService.showSuccess("Ligand Details Updated Successfully");
        this.LigandtypeForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      ligandtype001mb.insertUser = this.authManager.getcurrentUser.username;
      ligandtype001mb.insertDatetime = new Date();
      this.ligandTypeManager.ligandTypesave(ligandtype001mb).subscribe((response) => {
        this.calloutService.showSuccess("Ligand Details Saved Successfully");
        this.LigandtypeForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }



  }

  onReset() {
    this.submitted = false;
    this.LigandtypeForm.reset();
  }

}

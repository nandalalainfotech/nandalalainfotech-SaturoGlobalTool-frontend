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
import { LigandVersionManager } from 'src/app/shared/services/restcontroller/bizservice/ligandVersion.service';
import { Ligandversion001mb } from 'src/app/shared/services/restcontroller/entities/Ligandversion001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-ligand-version',
  templateUrl: './ligand-version.component.html',
  styleUrls: ['./ligand-version.component.css']
})
export class LigandVersionComponent implements OnInit {

  public LigandversionForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  ligandVersion: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  ligandVersion001: Ligandversion001mb[] = [];


  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;


  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private calloutService: CalloutService,
    private router: Router,
    private modalService: NgbModal,
    private ligandVersionManager: LigandVersionManager,
    private route: ActivatedRoute,) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }

  }

  ngOnInit(): void {

    this.createDataGrid001();

    this.LigandversionForm = this.formBuilder.group({
      ligandVersion: ['', Validators.required],
    });

    this.loadData();

   

  }

  loadData() {
    this.ligandVersionManager.allligandVersion().subscribe(response => {
      this.ligandVersion001 = deserialize<Ligandversion001mb[]>(Ligandversion001mb, response);
      if (this.ligandVersion001.length > 0) {
        this.gridOptions?.api?.setRowData(this.ligandVersion001);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }



  get f() { return this.LigandversionForm.controls; }


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
        headerName: 'Ligand-Version',
        field: 'ligandVersion',
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
    this.LigandversionForm.patchValue({
      'ligandVersion': params.data.ligandVersion,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "LigandVersion";
    modalRef.componentInstance.description = "Are you sure want to delete LigandVersion ?";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.ligandVersionManager.ligandVersiondelete(params.data.id).subscribe((response) => {
          for (let i = 0; i < this.ligandVersion001.length; i++) {
            if (this.ligandVersion001[i].id == params.data.id) {
              this.ligandVersion001?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Ligand Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "LigandVersion";
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

  onLigandversionClick(event: any, LigandversionForm: any) {
    this.markFormGroupTouched(this.LigandversionForm);
    this.submitted = true;
    if (this.LigandversionForm.invalid) {
      return;
    }

    let ligandversion001mb = new Ligandversion001mb();

    ligandversion001mb.ligandVersion = this.f.ligandVersion.value ? this.f.ligandVersion.value : "";   
    if (this.id) {
      ligandversion001mb.id = this.id;
      ligandversion001mb.insertUser = this.insertUser;
      ligandversion001mb.insertDatetime = this.insertDatetime;
      ligandversion001mb.updatedUser = this.authManager.getcurrentUser.username;
      ligandversion001mb.updatedDatetime = new Date();
      this.ligandVersionManager.ligandVersionupdate(ligandversion001mb).subscribe((response) => {
        this.calloutService.showSuccess("Ligand Details Updated Successfully");
        this.LigandversionForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      ligandversion001mb.insertUser = this.authManager.getcurrentUser.username;
      ligandversion001mb.insertDatetime = new Date();
      this.ligandVersionManager.ligandVersionsave(ligandversion001mb).subscribe((response) => {
        this.calloutService.showSuccess("Ligand Version Details Saved Successfully");
        this.LigandversionForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }



  }

  onReset() {
    this.submitted = false;
    this.LigandversionForm.reset();
  }

}

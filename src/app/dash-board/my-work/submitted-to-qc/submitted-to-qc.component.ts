import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
import { Ligand001wb } from 'src/app/shared/services/restcontroller/entities/Ligand001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-submitted-to-qc',
  templateUrl: './submitted-to-qc.component.html',
  styleUrls: ['./submitted-to-qc.component.css']
})
export class SubmittedToQcComponent implements OnInit {
  public AssayForm: FormGroup | any;
  submitted = false;
  public gridOptions: GridOptions | any;
  onFirstDataRendered: any;
  frameworkComponents: any;
  username: any;
  submittedToQCAssaysTan: any = [];
  ligand: Ligand001wb[] = [];
  assays: Assay001wb[] = [];
  inProcessAssays: Assay001wb[] = [];
  submittedToQCAssays: Assay001wb[] = [];
  ligand001mb?: Ligand001wb;
  ligandTans?: any[];
  ligands?: Ligand001wb[] = [];
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  assayId: number | any;


  constructor(
    private authManager: AuthManager,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private http: HttpClient,
    private modalService: NgbModal,
    private assayManager: AssayManager,
    private ligandManager: LigandManager,
    private router: Router
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.createDataGrid001();
    this.username = this.authManager.getcurrentUser.username;
    // this.assayManager.findInprocesStatus(this.username).subscribe(response => {
    //   this.assays = deserialize<Assay001wb[]>(Assay001wb, response);

    // });

    this.ligandManager.allligand(this.username).subscribe(response => {
      this.ligand = deserialize<Ligand001wb[]>(Ligand001wb, response);
      
      this.ligands = this.ligand.filter((v,i,a)=>a.findIndex(v2=>(v2.status === "Before submit the data" && v2.tanNumber===v.tanNumber))===i);
      this.gridOptions?.api?.refreshCells();
      if (this.ligand.length > 0) {
        this.gridOptions?.api?.setRowData(this.ligands);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }


  

  get f() { return this.AssayForm.controls; }

  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };

    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    // this.gridOptions.refreshCells({ force: true });

    this.gridOptions.columnDefs = [
      {
        headerName: 'Sl-No',
        field: 'ligandId',
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
      // {
      //   headerName: ' BATCH NUMBER',
      //   field: 'cbatchNo',
      //   width: 150,
      //   flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true
      // },
      {
        headerName: 'TAN NUMBER',
        field: 'tanNumber',
        width: 150,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setTanNumber.bind(this)
      },

      // {
      //   headerName: 'View',
      //   cellRenderer: 'iconRenderer',
      //   width: 80,
      //   flex: 1,
      //   suppressSizeToFit: true,
      //   cellStyle: { textAlign: 'left' },
      //   cellRendererParams: {
      //     // onClick: this.onEditButtonClick.bind(this),
      //     label: 'Edit'
      //   },
      // },

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
        headerName: 'SUBMIT',
        cellRenderer: 'iconRenderer',
        width: 85,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'left' },
        cellRendererParams: {
          onClick: this.onSubmitToQcClick.bind(this),
          label: 'Start'
        },
      },
    ]
  }


  onEditButtonClick(params: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "ligandId": params.data.ligandId,
        "tanNumber": params.data.tanNumber,
        "insertUsers": params.data.insertUser,
      }
    };

    this.router.navigate(["/app-dash-board/app-search-setting"], navigationExtras);
  }

  onSubmittedMoveToLigand(params: any) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "tanNumber": params.data.tanNumber,
        "ligandVersion": params.data.ligandVersionSlno,
        "ligandType": params.data.ligandTypeSlno,
        "identifier1": params.data.identifier1,
        "identifier2": params.data.identifier2,
        "identifier3": params.data.identifier3,
        "collectionId": params.data.collectionId,
        "locator": params.data.locator,
        "ligandDetail": params.data.ligandDetail,
        "diseaseName1": params.data.diseaseName1,
        "diseaseName2": params.data.diseaseName2,
        "diseaseName3": params.data.diseaseName3,
      }
    };

    this.router.navigate(["/app-dash-board/app-stepper"], navigationExtras);
  }

  onSubmitToQcClick(params: any) {
  
    this.ligandManager.updateStatus(this.username,params.data.ligandId, params.data.tanNumber).subscribe(response => {
      this.ligand = deserialize<Ligand001wb[]>(Ligand001wb, response);
      this.calloutService.showSuccess("Assay Details Saved Successfully and \n Details Sent to Reviewer");
      this.gridOptions?.api?.setRowData([]);
      
      this.ligandManager.allligand(this.username).subscribe(response => {
        this.ligand = deserialize<Ligand001wb[]>(Ligand001wb, response);
        this.ligands = this.ligand.filter((v,i,a)=>a.findIndex(v2=>(v2.status === "Before submit the data" && v2.tanNumber===v.tanNumber))===i);
        this.gridOptions?.api?.refreshCells();
        if (this.ligand.length > 0) {
          this.gridOptions?.api?.setRowData(this.ligands);
        } else {
          this.gridOptions?.api?.setRowData([]);
        }
      });
    });
  }
}

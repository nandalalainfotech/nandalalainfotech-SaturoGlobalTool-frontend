import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
import { Ligand001wb } from 'src/app/shared/services/restcontroller/entities/Ligand001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-inprocess',
  templateUrl: './inprocess.component.html',
  styleUrls: ['./inprocess.component.css']
})
export class InprocessComponent implements OnInit {

  submitted = false;
  public gridOptions1: GridOptions | any;
  public gridOptions2: GridOptions | any;
  onFirstDataRendered: any;
  frameworkComponents: any;
  username: any;
  tanNumber: string = "";
  ligands: Ligand001wb[] = [];
  assays: Assay001wb[] = [];
  assay001wbs?: Assay001wb;
  inProcessAssays: Assay001wb[] = [];
  inProcessLigand: Assay001wb[] = [];
  submittedToQCAssays: Assay001wb[] = [];
  public inprocess: any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private http: HttpClient,
    private modalService: NgbModal,
    private assayManager: AssayManager,
    private ligandManager: LigandManager,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.createDataGrid001();
    this.createDataGrid002();

    this.username = this.authManager.getcurrentUser.username;

    this.ligandManager.allligand(this.username).subscribe(response => {
      this.ligands = deserialize<Ligand001wb[]>(Ligand001wb, response);

      for (let ligandObject of this.ligands) {
        if (ligandObject.status == "In Process") {

          if (ligandObject.assay001wbs && ligandObject.assay001wbs.length > 0) {

            for (let assay of ligandObject.assay001wbs) {
              if (assay.status == "In Process") {

                this.inProcessLigand.push(assay);

              }
            }
          } else {
            let inProcessLigand = new Assay001wb();

            inProcessLigand.ligandSlno = ligandObject.ligandId;
            let ligand001wb = new Ligand001wb();
            ligand001wb.ligandId = ligandObject.ligandId;
            ligand001wb.tanNumber = ligandObject.tanNumber;
            ligand001wb.ligandUri = ligandObject.ligandUri;
            ligand001wb.ligandVersionSlno = ligandObject.ligandVersionSlno;
            ligand001wb.ligandStatus = ligandObject.ligandStatus;
            ligand001wb.collection = ligandObject.collection;
            ligand001wb.ligandTypeSlno = ligandObject.ligandTypeSlno;
            ligand001wb.ligandDetail = ligandObject.ligandDetail;
            ligand001wb.identifier1 = ligandObject.identifier1;
            ligand001wb.identifier2 = ligandObject.identifier2;
            ligand001wb.identifier3 = ligandObject.identifier3;
            ligand001wb.collectionId = ligandObject.collectionId;
            ligand001wb.locator = ligandObject.locator;
            ligand001wb.sourceType = ligandObject.sourceType;
            ligand001wb.citation = ligandObject.citation;
            ligand001wb.relatedDocument = ligandObject.relatedDocument;
            ligand001wb.registryNumber = ligandObject.registryNumber;
            ligand001wb.diseaseName1 = ligandObject.diseaseName1;
            ligand001wb.diseaseName2 = ligandObject.diseaseName2;
            ligand001wb.diseaseName3 = ligandObject.diseaseName3;
            ligand001wb.status = ligandObject.status;

            inProcessLigand.ligandSlno2 = ligand001wb;


            // inProcessAssay. = ligandObject.tanNumber;
            // inProcessAssay.status = ligandObject.status;
            this.inProcessLigand.push(inProcessLigand);

          }
        }
      }

      if (this.inProcessLigand.length > 0) {
        this.gridOptions1?.api?.setRowData(this.inProcessLigand);
      } else {
        this.gridOptions1?.api?.setRowData([]);
      }
    });

    // ----------------------------------Assay In Process------------------------

    this.assayManager.findInprocesStatus(this.username).subscribe(response => {
      this.assays = deserialize<Assay001wb[]>(Assay001wb, response);

      for (let assay of this.assays) {
        if (assay.status == "In Process") {
          this.inProcessAssays.push(assay);

        }
      }
      if (this.inProcessAssays.length > 0) {
        this.gridOptions2?.api?.setRowData(this.inProcessAssays);
      } else {
        this.gridOptions2?.api?.setRowData([]);
      }
    });

  }

  // get f() { return this.AssayForm.controls; }

  createDataGrid001(): void {
    this.gridOptions1 = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions1.editType = 'fullRow';
    this.gridOptions1.enableRangeSelection = true;
    this.gridOptions1.animateRows = true;

    // if(this.inProcessAssays[i].status){

    this.gridOptions1.columnDefs = [
      {
        headerName: 'Sl-No',
        field: 'ligandSlno',
        width: 100,
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
        headerName: 'TAN NUMBER',
        field: 'tanNumber',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setTanNumber.bind(this)
      },

      {
        headerName: 'START',
        cellRenderer: 'iconRenderer',
        width: 100,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onInprocessMoveToLigandAndAssay.bind(this),
          label: 'Start',
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
          onClick: this.onLigandDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },

    ]


    // }
  }

  setTanNumber(params: any): string {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.tanNumber : null;
  }

  onLigandDeleteButtonClick(params: any) {
    // if (params.data.status != "Submitted to QC") {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Ligand";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.ligandManager.liganddelete(params.data.ligandId).subscribe((response) => {
          for (let i = 0; i < this.inProcessAssays.length; i++) {
            if (this.inProcessAssays[i].ligandSlno == params.data.ligandSlno2.ligandId) {
              this.inProcessAssays?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions1.api.deselectAll();
          this.calloutService.showSuccess("Inprocess Data Removed Successfully");
        });
      }
    })
    // }
  }
  // --------------------------------------------Assay inprocess-----------------

  createDataGrid002(): void {
    this.gridOptions2 = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions2.editType = 'fullRow';
    this.gridOptions2.enableRangeSelection = true;
    this.gridOptions2.animateRows = true;

    // if(this.inProcessAssays[i].status){

    this.gridOptions2.columnDefs = [
      {
        headerName: 'Sl-No',
        field: 'assayId',
        width: 100,
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
        headerName: 'TAN NUMBER',
        field: 'tanNumber',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setAssayTanNumber.bind(this)
      },

      {
        headerName: 'START',
        cellRenderer: 'iconRenderer',
        width: 100,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onInprocessMoveToLigandAndAssay.bind(this),
          label: 'Start',
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
          onClick: this.onAssaydDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },

    ]


    // }
  }

  setAssayTanNumber(params: any): string {

    return params.data.ligandSlno2 ? params.data.ligandSlno2.tanNumber : null;
  }

  onAssaydDeleteButtonClick(params: any) {
    // if (params.data.status != "Submitted to QC") {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Ligand";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.ligandManager.liganddelete(params.data.ligandId).subscribe((response) => {
          for (let i = 0; i < this.inProcessAssays.length; i++) {
            if (this.inProcessAssays[i].ligandSlno == params.data.ligandSlno2.ligandId) {
              this.inProcessAssays?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions2.api.deselectAll();
          this.calloutService.showSuccess("Inprocess Data Removed Successfully");
        });
      }
    })
    // }
  }



  onInprocessMoveToLigandAndAssay(params: any) {
    

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "ligandId": params.data.ligandSlno2.ligandId,
        "assayId": params.data.assayId,
      }
    };

    this.router.navigate(["/app-dash-board/app-stepper"], navigationExtras);
  }
  
}

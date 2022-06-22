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
  public gridOptions: GridOptions | any;
  onFirstDataRendered: any;
  frameworkComponents: any;
  username: any;
  tanNumber: string = "";
  ligands: Ligand001wb[] = [];
  assays: Assay001wb[] = [];
  assay001wbs?: Assay001wb;
  inProcessAssays: Assay001wb[] = [];
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

    this.username = this.authManager.getcurrentUser.username;

    this.ligandManager.allligand(this.username).subscribe(response => {
      this.ligands = deserialize<Ligand001wb[]>(Ligand001wb, response);
      console.log("this.ligands in inProcess---->", this.ligands);

      for (let ligandObject of this.ligands) {
        if (ligandObject.status == "In Process") {

          if (ligandObject.assay001wbs && ligandObject.assay001wbs.length > 0) {

            for (let assay of ligandObject.assay001wbs) {
              if (assay.status == "In Process") {

                this.inProcessAssays.push(assay);

              }
            }
          } else {
            let inProcessAssay = new Assay001wb();

            inProcessAssay.ligandSlno = ligandObject.ligandId;
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

            inProcessAssay.ligandSlno2 = ligand001wb;


            // inProcessAssay. = ligandObject.tanNumber;
            // inProcessAssay.status = ligandObject.status;
            this.inProcessAssays.push(inProcessAssay);

          }
        }
      }

      if (this.inProcessAssays.length > 0) {
        this.gridOptions?.api?.setRowData(this.inProcessAssays);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }




  // get f() { return this.AssayForm.controls; }

  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;

    // if(this.inProcessAssays[i].status){

    this.gridOptions.columnDefs = [
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
          onClick: this.onInprocessMoveToLigand.bind(this),
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
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },

    ]


    // }
  }

  setTanNumber(params: any): string {

    return params.data.ligandSlno2 ? params.data.ligandSlno2.tanNumber : null;
  }

  onDeleteButtonClick(params: any) {
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
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Inprocess Data Removed Successfully");
        });
      }
    })
  // }
  }


  onInprocessMoveToLigand(params: any) {
    // console.log("params", params.data);
    // let assayId = params.data.assayId;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "insertUsers": params.data.insertUser,
        "tanNumber": params.data.ligandSlno2.tanNumber,
        "ligandVersions": params.data.ligandSlno2.ligandVersionSlno,
        "ligandType": params.data.ligandSlno2.ligandTypeSlno,
        "identifier1": params.data.ligandSlno2.identifier1,
        "identifier2": params.data.ligandSlno2.identifier2,
        "identifier3": params.data.ligandSlno2.identifier3,
        "collectionId": params.data.ligandSlno2.collectionId,
        "locator": params.data.ligandSlno2.locator,
        "ligandDetail": params.data.ligandSlno2.ligandDetail,
        "diseaseName1": params.data.ligandSlno2.diseaseName1,
        "diseaseName2": params.data.ligandSlno2.diseaseName2,
        "diseaseName3": params.data.ligandSlno2.diseaseName3,



        "assayId": params.data.assayId,
        "insertUser": params.data.insertUser,
        "ligandVersion": params.data.ligandSlno,
        "assayType": params.data.assayTypeSlno,
        "toxiCity": params.data.toxiCitySlno,
        "route": params.data.routeSlno,
        "administration": params.data.administration,
        "procedure": params.data.procedure,
        "ligandSvalue": params.data.ligandSvalue,
        "unit": params.data.unitSlno,
        "ligandHvalue": params.data.ligandHvalue,
        "ligandLvalue": params.data.ligandLvalue,
        "unitedSlno": params.data.unitedSlno,

        "conditionType": params.data.conditionType,
        "conditionMaterial": params.data.conditionMaterial,
        "conditionMaterialid": params.data.conditionMaterialid,
        "singleCondition": params.data.singleCondition,
        "units": params.data.units,
        "highCondition": params.data.highCondition,
        "lowCondition": params.data.lowCondition,
        "highLowUnit": params.data.highLowUnit,
        "dataLocator1": params.data.dataLocator1,
        "dataLocator2": params.data.dataLocator2,
        "dataLocator3": params.data.dataLocator3,
        "category": params.data.categorySlno,
        "function": params.data.functionSlno,

        "parameter": params.data.parameter,
        "parameterDetail": params.data.parameterDetail,
        "originalPrefixSlno": params.data.originalPrefixSlno,
        "singleValue": params.data.singleValue,
        "measurementunits": params.data.units,
        "highEndValue": params.data.highEndValue,
        "lowEndValue": params.data.lowEndValue,
        "measurementunitedSlno": params.data.unitSlno,
        "nonNumeric": params.data.nonNumeric,
        "remark": params.data.remark,
        //  pending  to bio

        "type": params.data.typeSlno,
        "cell": params.data.cell,
        "cellDetail": params.data.cellDetail,
        "organ": params.data.organ,
        "organDetail": params.data.organDetail,
        "species": params.data.species,
        "speciesDetail": params.data.speciesDetail,
        "gender": params.data.gender,
        "ageGroup": params.data.ageGroup,
        "targetVersion": params.data.targetVersion,
        "collectionId1": params.data.collectionId1,
        "original": params.data.original,
        "acronym": params.data.acronym,
        "organism": params.data.organism,
        "variant": params.data.variant,


      }
    };

    this.router.navigate(["/app-dash-board/app-stepper"], navigationExtras);
  }



  // onAuditButtonClick(params: any) {
  //   const modalRef = this.modalService.open(AuditComponent);
  //   modalRef.componentInstance.title = "Assay";
  //   modalRef.componentInstance.details = params.data;
  // }

}

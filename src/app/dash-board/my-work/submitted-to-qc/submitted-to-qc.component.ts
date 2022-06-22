import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

@Component({
  selector: 'app-submitted-to-qc',
  templateUrl: './submitted-to-qc.component.html',
  styleUrls: ['./submitted-to-qc.component.css']
})
export class SubmittedToQcComponent implements OnInit {

  submitted = false;
  public gridOptions: GridOptions | any;
  onFirstDataRendered: any;
  frameworkComponents: any;
  username: any;

  ligand: Ligand001wb[] = [];
  assays: Assay001wb[] = [];
  inProcessAssays: Assay001wb[] = [];
  submittedToQCAssays: Assay001wb[] = [];

  constructor(
    private authManager: AuthManager,
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
//  this.ligandManager.findSubmotToQcStatus(this.username).subscribe(response => {
//       this.ligand = deserialize<Ligand001wb[]>(Ligand001wb, response);
//       console.log("this.ligand in process",this.ligand);
      
//       if (this.ligand.length > 0) {
//         this.gridOptions?.api?.setRowData(this.ligand);
//       } else {
//         this.gridOptions?.api?.setRowData([]);
//       }
//     });
this.assayManager.findInprocesStatus(this.username).subscribe(response => {
  this.assays = deserialize<Assay001wb[]>(Assay001wb, response);
  // console.log(" this.findInprocesStatus", this.assays);
  
  for (let assay of this.assays) {
    if(assay.status == "Before submit the data" ) {
      this.submittedToQCAssays.push(assay);
      console.log("this.submittedToQCAssays--->",this.submittedToQCAssays);
      
    } 
  }
  if (this.submittedToQCAssays.length > 0) {
    this.gridOptions?.api?.setRowData(this.submittedToQCAssays);
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

    this.gridOptions.columnDefs = [
      {
        headerName: 'Sl-No',
        field: 'assayId',
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
        headerName: ' BATCH NUMBER',
        field: 'cbatchNo',
        width: 150,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'TAN NUMBER',
        width: 150,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setTanNumber.bind(this)
      },

     
      
      {
        headerName: 'View',
        cellRenderer: 'iconRenderer',
        width: 80,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'left' },
        cellRendererParams: {
          // onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
        },
      },

      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 80,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'left' },
        cellRendererParams: {
          // onClick: this.onEditButtonClick.bind(this),
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
          // onClick: this.onDeleteButtonClick.bind(this),
          label: 'Start'
        },
      },

      
      
      
    ]
  }
  setTanNumber(params: any): string {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.tanNumber : null;
  }

  setVersion(params: any): string {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.ligandVersionSlno2?.ligandVersion : null;
  }

  setAssayType(params: any): string {
    return params.data.assayTypeSlno2 ? params.data.assayTypeSlno2.assayType : null;
  }

  setToxicityType(params: any): string {
    return params.data.toxiCitySlno2 ? params.data.toxiCitySlno2.toxiCity : null;
  }

  setRouteAdmin(params: any): string {
    return params.data.routeSlno2 ? params.data.routeSlno2.route : null;
  }

  setUnitSingleValue(params: any): string {
    return params.data.unitSlno2 ? params.data.unitSlno2.unit : null;
  }

  setUnitLowValue(params: any): string {
    return params.data.unitedSlno2 ? params.data.unitedSlno2.united : null;
  }

  setCategory(params: any){
    return params.data.categorySlno2 ? params.data.categorySlno2.category : null;
  }

  setCategoryFunction(params: any){
    return params.data.functionSlno2 ? params.data.functionSlno2.function : null;
  }
 
  setOriginalPrefix(params: any) {
    return params.data.originalPrefixSlno2 ? params.data.originalPrefixSlno2.originalPrefix : null;
  }


  setTypes(params: any) {
    return params.data.typeSlno2 ? params.data.typeSlno2.type : null;
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
    
    this.router.navigate(["/app-dash-board/app-stepper"],navigationExtras);
  }

  setLigandVersion(params: any): string {
    return params.data.ligandVersionSlno2 ? params.data.ligandVersionSlno2.ligandVersion : null;
  }

  setType(params: any): string {
    return params.data.ligandTypeSlno2 ? params.data.ligandTypeSlno2.ligandtype : null;
  }

  // onAuditButtonClick(params: any) {
  //   const modalRef = this.modalService.open(AuditComponent);
  //   modalRef.componentInstance.title = "Assay";
  //   modalRef.componentInstance.details = params.data;
  // }

}

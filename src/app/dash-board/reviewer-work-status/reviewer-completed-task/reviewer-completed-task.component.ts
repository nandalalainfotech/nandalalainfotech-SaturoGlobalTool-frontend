import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { LigandTypeManager } from 'src/app/shared/services/restcontroller/bizservice/ligandType.service';
import { LigandVersionManager } from 'src/app/shared/services/restcontroller/bizservice/ligandVersion.service';
import { LigandReportsManager } from 'src/app/shared/services/restcontroller/bizservice/report.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
import { Ligand001wb } from 'src/app/shared/services/restcontroller/entities/Ligand001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-reviewer-completed-task',
  templateUrl: './reviewer-completed-task.component.html',
  styleUrls: ['./reviewer-completed-task.component.css']
})
export class ReviewerCompletedTaskComponent implements OnInit {

  public LigandForm: FormGroup | any;
  public CheckedForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;
  public gridOptions: GridOptions | any;
  public gridOptions1: GridOptions | any;
  public gridOptions2: GridOptions | any;
  ligandId: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  // searchPopup: string = '';

  ligand: Ligand001wb[] = [];
  assays: Assay001wb[] = [];
  inProcessAssays: Assay001wb[] = [];
  completedByReviewers: Assay001wb[] = [];
  assay: Assay001wb[] = [];

  username: any
  hexToRgb: any;
  rgbToHex: any;

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;
  modalRef: any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    // private route: ActivatedRoute,
    private modalService: NgbModal,
    private ligandManager: LigandManager,
    private assayManager: AssayManager,
    private ligandReportsManager: LigandReportsManager,
    private ligandVersionManager: LigandVersionManager,
    private ligandTypeManager: LigandTypeManager,
    private http: HttpClient,
    // private calloutService: CalloutServiceF,
    private router: Router
  ) {

    this.frameworkComponents = {
      iconRenderer: IconRendererComponent,

    }
  }

  ngOnInit(): void {

    this.createDataGrid001();
    // this.createDataGrid002();
    // this.createDataGrid003();

    this.username = this.authManager.getcurrentUser.username;

    this.assayManager.allAssayReviewer(this.username).subscribe(response => {
      this.assays = deserialize<Assay001wb[]>(Assay001wb, response);
      
      for (let assay of this.assays) {
        if(assay.status == "Completed") {
          this.completedByReviewers.push(assay);
        } 
      }
      if (this.completedByReviewers.length > 0) {
        this.gridOptions?.api?.setRowData(this.completedByReviewers);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });


    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);
      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });
  }

  onAccepted() {

  }


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
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
        // valueGetter: this.setLigandId.bind(this)
      },

      // {
      //   headerName: ' BATCH NUMBER',
      //   field: 'cbatchNo',
      //   width: 200,
      //   flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true
      // },
      
      {
        headerName: 'TAN Number',
        field: 'tanNumber',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        // headerCheckboxSelection: true,
        // headerCheckboxSelectionFilteredOnly: true,
        // checkboxSelection: true,
        suppressSizeToFit: true,
        valueGetter: this.settanNumber.bind(this)
      },
     ];
  }
  // -----------Measurement---------------------
  setTypesValue(params: any) {
    return params.data.typeSlno2? params.data.typeSlno2.type : null;
  }

  setOriginalPrefix(params: any) {
    return params.data.originalPrefixSlno2? params.data.originalPrefixSlno2.originalPrefix : null;
  }


  setCategoryFunction(params: any) {
    return params.data.functionSlno2? params.data.functionSlno2.function : null;
  }

  setCategoryValue(params: any) {
     return params.data.categorySlno2? params.data.categorySlno2.category : null;
  }



  setUnitLowValue(params: any) {
    return params.data.unitedSlno2 ? params.data.unitedSlno2.united : null;
  }

  setUnitSingleValue(params: any) {
    return params.data.unitSlno2 ? params.data.unitSlno2.unit : null;
  }

  setAssayRouteAdmin(params: any) {
    return params.data.routeSlno2 ? params.data.routeSlno2.route : null;
  }

  setAssayToxicityType(params: any) {
    return params.data.toxiCitySlno2 ? params.data.toxiCitySlno2.toxiCity : null;
  }

  setAssayType(params: any) {
    return params.data.assayTypeSlno2 ? params.data.assayTypeSlno2.assayType : null;
  }

  setDiseaseName3(params: any) {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.diseaseName3 : null;
  }

  setDiseaseName2(params: any) {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.diseaseName2 : null;
  }

  setDiseaseName1(params: any) {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.diseaseName1 : null;
  }

  setLigandLocator(params: any) {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.locator : null;
  }

  setLigandCollection(params: any) {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.collectionId : null;
  }

  setIdentifier3(params: any) {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.identifier3 : null;
  }

  setIdentifier2(params: any) {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.identifier2 : null;
  }

  setIdentifier1(params: any) {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.identifier1 : null;
  }

  setLigandDetails(params: any) {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.ligandDetail : null;
  }

  setLigandType(params: any) {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.ligandTypeSlno2.ligandtype : null;
  }

  setLigandVersion(params: any) {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.ligandVersionSlno2.ligandVersion : null;
  }
  
  settanNumber(params: any) {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.tanNumber : null;
  }

 
  

 

  setStatusName(params: any): string {
    return params.data.acc = "ok";
  }

}

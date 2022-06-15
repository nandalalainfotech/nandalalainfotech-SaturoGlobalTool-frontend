import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { saveAs } from 'file-saver';
import { param } from 'jquery';
import { deserialize } from 'serializer.ts/Serializer';
import { CheckedComponent } from 'src/app/shared/checked/checked.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { LigandTypeManager } from 'src/app/shared/services/restcontroller/bizservice/ligandType.service';
import { LigandVersionManager } from 'src/app/shared/services/restcontroller/bizservice/ligandVersion.service';
import { MeasurementManager } from 'src/app/shared/services/restcontroller/bizservice/Measurement.service';
import { LigandReportsManager } from 'src/app/shared/services/restcontroller/bizservice/report.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
import { Ligand001wb } from 'src/app/shared/services/restcontroller/entities/Ligand001wb';
import { Measurement001wb } from 'src/app/shared/services/restcontroller/entities/Measurement001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  headerText: string = ";"
  @Input() acc: string = '';

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
  // Ligandversions=Ligandversion001mb[] = [];
  // Ligandtypes=Ligandtype001mb[] = [];
  assay: Assay001wb[] = [];
  measurement: Measurement001wb[] = [];
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
    private measurementManager: MeasurementManager,
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

    this.assayManager.findByReviewer(this.username).subscribe(response => {
      this.assay = deserialize<Assay001wb[]>(Assay001wb, response);
      if (this.assay.length > 0) {
        this.gridOptions?.api?.setRowData(this.assay);
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
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 80,
        //flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
        },
      },


      {
        headerName: 'TAN Number',
        field: 'tanNumber',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
        valueGetter: this.settanNumber.bind(this)
      },
      {
        headerName: 'Ligand-Version',
        // field: 'ligandVersion',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setLigandVersion.bind(this)
      },
      {
        headerName: 'Ligand-Type',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setLigandType.bind(this)

      },
      {
        headerName: 'Ligand-detail',
        field: 'ligandDetail',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setLigandDetails.bind(this)
      },
      {
        headerName: 'Identifier1',
        field: 'identifier1',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setIdentifier1.bind(this)
      },
      {
        headerName: 'Identifier2',
        field: 'identifier2',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setIdentifier2.bind(this)
      },
      {
        headerName: 'Identifier3',
        field: 'identifier3',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setIdentifier3.bind(this)
      },
      {
        headerName: 'Collection',
        field: 'collection',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setLigandCollection.bind(this)
      },
      {
        headerName: 'Locator',
        field: 'locator',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setLigandLocator.bind(this)
      },
      {
        headerName: 'Original-disease-name1',
        field: 'diseaseName1',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setDiseaseName1.bind(this)
      },
      {
        headerName: 'Original-disease-name2',
        field: 'diseaseName2',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setDiseaseName2.bind(this)
      },
      {
        headerName: 'Original-disease-name3',
        field: 'diseaseName3',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setDiseaseName3.bind(this)
      },
      {
        headerName: 'Target-Version',
        field: 'targetVersion',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Collection-ID',
        field: 'collectionId1',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Target-Name',
        field: 'original',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Acronym',
        field: 'acronym',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Organism-Source',
        field: 'organism',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Variant',
        field: 'variant',
        width: 200,
        //flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
// -----------Assay---------------------
// {
//   headerName: 'Ligand-Version',
//   width: 200,
//   // flex: 1,
//   sortable: true,
//   filter: true,
//   resizable: true,
//   suppressSizeToFit: true,
//   // valueGetter: this.setLigandVersion.bind(this)
// },
{
  headerName: 'Ordinal',
  field: 'ordinal',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Assay-type',
  field: 'assayTypeSlno',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  valueGetter: this.setAssayType.bind(this)
},
{
  headerName: 'Toxicity-type',
  field: 'toxiCitySlno',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  valueGetter: this.setAssayToxicityType.bind(this)
},
{
  headerName: 'Route-of-administration',
  field: 'routeSlno',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  valueGetter: this.setAssayRouteAdmin.bind(this)
},
{
  headerName: 'Ligand-Dose(singleValue)',
  field: 'ligandSvalue',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Unit(singleValue)',
  field: 'unitSlno',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  valueGetter: this.setUnitSingleValue.bind(this)
},
{
  headerName: 'Ligand-Dose(highValue)',
  field: 'ligandHvalue',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Ligand-Dose(lowValue)',
  field: 'ligandLvalue',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},

{
  headerName: 'unit',
  field: 'unitedSlno',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  valueGetter: this.setUnitLowValue.bind(this)
},
{
  headerName: 'Administration',
  field: 'administration',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
suppressSizeToFit: true,
},
{
  headerName: 'Procedure',
  field: 'procedure',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Condition type',
  field: 'conditionType',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
suppressSizeToFit: true,
},
{
  headerName: 'Condition material',
  field: 'conditionMaterial',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
suppressSizeToFit: true,
},
{
  headerName: 'Condition material-id',
  field: 'conditionMaterialid',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Condition(Single-value)',
  field: 'singleCondition',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Unit(Single-value)',
  field: 'singleUnit',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Condition(High-end-value)',
  field: 'highCondition',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Condition(Low-end-value)',
  field: 'lowCondition',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Unit',
  field: 'highLowUnit',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,

},
// -----------Measurement---------------------
{
  headerName: 'Data-locator',
  field: 'dataLocator',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  // valueGetter: this.setDataLocatorValue.bind(this)
},
{
  headerName: 'Category',
  field: 'categorySlno',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  valueGetter: this.setCategoryValue.bind(this)
},
{
  headerName: 'Function',
  field: 'functionSlno',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  valueGetter: this.setCategoryFunction.bind(this)
},
{
  headerName: 'Parameter',
  field: 'parameter',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  // valueGetter: this.setParameterValue.bind(this)
},
{
  headerName: 'Parameter-detail',
  field: 'parameterDetail',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  // valueGetter: this.setParameterDetailsValue.bind(this)
},
{
  headerName: 'Original-prefix',
  field: 'originalPrefixSlno',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  valueGetter: this.setOriginalPrefix.bind(this)
},
{
  headerName: 'Original-value(Single-value)',
  field: 'singleValue',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Unit',
  field: 'unit',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  valueGetter: this.setUnitSingleValue.bind(this)
},
{
  headerName: 'Original-value(Single-value)',
  field: 'singleValue',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,

},
{
  headerName: 'Original-value(High-End-value)',
  field: 'highEndValue',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,

},
{
  headerName: 'Original-value(Low-End-value)',
  field: 'lowEndValue',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Unit',
  field: 'units',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  setUnitLowValue(params: any) {
    return params.data.unitedSlno2 ? params.data.unitedSlno2.united : null;
  }

},
{
  headerName: 'Original-value(Non-numeric-value)',
  field: 'nonNumeric',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Remarks',
  field: 'remark',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,

},
{
  headerName: 'Type',
  field: 'typeSlno',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  // valueGetter: this.setTypesValue.bind(this)

},
{
  headerName: 'Cell',
  field: 'cell',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,

},
{
  headerName: 'Cell-detail',
  field: 'cellDetail',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Organ',
  field: 'organ',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,

},
{
  headerName: 'Organ-detail',
  field: 'organDetail',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Species',
  field: 'species',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,

},
{
  headerName: 'Species-detail',
  field: 'speciesDetail',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
},
{
  headerName: 'Gender',
  field: 'gender',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,

},
{
  headerName: 'Age-group',
  field: 'ageGroup',
  width: 200,
  // flex: 1,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
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

  // setLigandId(params: any) {
  //   return params.data.assaySlno2 ? params.data.assaySlno2.ligandSlno2.ligandId : null;
  // }
  

  onEditButtonClick(params: any) {
    const modalRef = this.modalService.open(CheckedComponent, { size: 'lg' });
    modalRef.componentInstance.data = params.data;
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.calloutService.showSuccess("Ligand Data Accepted Successfully");
      }

    }

    )

  }

  setStatusName(params: any): string {
    return params.data.acc = "ok";
  }

  


  //  ------EXCEL FILE --------//

  onGenerateExcelReport() {
    this.ligandReportsManager.machineReportsExcel().subscribe((response) => {
      console.log("response", response);
      // if (this.ligand) {
      //   saveAs(response);
      // } else {
      //   saveAs(response, "download");
      // }
      const blob = new Blob([response], {
        type: 'application/zip'
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    })
  }

}



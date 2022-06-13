import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
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

  assay: Assay001wb[] = [];

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private http: HttpClient,
    private modalService: NgbModal,
    private assayManager: AssayManager,
  ) { 
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.createDataGrid001();

    this.username = this.authManager.getcurrentUser.username;
    this.assayManager.allassay(this.username).subscribe(response => {

      this.assay = deserialize<Assay001wb[]>(Assay001wb, response);
      if (this.assay.length > 0) {
        this.gridOptions?.api?.setRowData(this.assay);
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
        // flex: 1,
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
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setVersion.bind(this)
      },
      {
        headerName: 'Ordinal',
        field: 'ordinal',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
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
        valueGetter: this.setToxicityType.bind(this)
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
        valueGetter: this.setRouteAdmin.bind(this)
      },
      {
        headerName: 'Ligand-Dose(singleValue)',
        field: 'ligandSvalue',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
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
        suppressSizeToFit: true
      },
      {
        headerName: 'Ligand-Dose(lowValue)',
        field: 'ligandLvalue',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
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

        suppressSizeToFit: true
      },
      {
        headerName: 'Procedure',
        field: 'procedure',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Condition type',
        field: 'conditionType',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Condition material',
        field: 'conditionMaterial',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Condition material-id',
        field: 'conditionMaterialid',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Condition(Single-value)',
        field: 'singleCondition',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Unit(Single-value)',
        field: 'singleUnit',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Condition(High-end-value)',
        field: 'highCondition',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Condition(Low-end-value)',
        field: 'lowCondition',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Unit',
        field: 'highLowUnit',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },




      {
        headerName: 'Data-locator',
        field: 'dataLocator',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Category',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setCategory.bind(this)
      },
      {
        headerName: 'Function',
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

      },
      {
        headerName: 'Original-prefix',
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
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setTypes.bind(this)
        
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

      // {
      //   headerName: 'Edit',
      //   cellRenderer: 'iconRenderer',
      //   width: 80,
      //   // flex: 1,
      //   suppressSizeToFit: true,
      //   cellStyle: { textAlign: 'center' },
      //   cellRendererParams: {
      //     onClick: this.onEditButtonClick.bind(this),
      //     label: 'Edit'
      //   },
      // },
      // {
      //   headerName: 'Delete',
      //   cellRenderer: 'iconRenderer',
      //   width: 85,
      //   // flex: 1,
      //   suppressSizeToFit: true,
      //   cellStyle: { textAlign: 'center' },
      //   cellRendererParams: {
      //     onClick: this.onDeleteButtonClick.bind(this),
      //     label: 'Delete'
      //   },
      // },
      {
        headerName: 'Audit',
        cellRenderer: 'iconRenderer',
        width: 80,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onAuditButtonClick.bind(this),
          label: 'Audit'
        },
      },
    ]
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

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Assay";
    modalRef.componentInstance.details = params.data;
  }

}

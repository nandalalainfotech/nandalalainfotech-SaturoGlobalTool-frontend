import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CategoryManager } from 'src/app/shared/services/restcontroller/bizservice/category.service';
import { CategoryfunctionManager } from 'src/app/shared/services/restcontroller/bizservice/categoryFunction.service';
import { MeasurementManager } from 'src/app/shared/services/restcontroller/bizservice/Measurement.service';
import { OriginalprefixManager } from 'src/app/shared/services/restcontroller/bizservice/originalPrefix.service';
import { BioTypeManager } from 'src/app/shared/services/restcontroller/bizservice/type.service';
import { UnitlowendvalueManager } from 'src/app/shared/services/restcontroller/bizservice/Unitlowendvalue.service';
import { UnitSingleValueManager } from 'src/app/shared/services/restcontroller/bizservice/unitSingleValue.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
import { Category001mb } from 'src/app/shared/services/restcontroller/entities/Category001mb';
import { Categoryfunction001mb } from 'src/app/shared/services/restcontroller/entities/Categoryfunction001mb';
import { Ligand001wb } from 'src/app/shared/services/restcontroller/entities/Ligand001wb';
import { Measurement001wb } from 'src/app/shared/services/restcontroller/entities/Measurement001wb';
import { Originalprefix001mb } from 'src/app/shared/services/restcontroller/entities/Originalprefix001mb';
import { Type001mb } from 'src/app/shared/services/restcontroller/entities/Type001mb';
import { Unitlowendvalue001mb } from 'src/app/shared/services/restcontroller/entities/Unitlowendvalue001mb';
import { Unitsinglevalue001mb } from 'src/app/shared/services/restcontroller/entities/Unitsinglevalue001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {

  MeasurementForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  measurementId: number | any;
  assaySlno: number | any;
  dataLocator: string = "";
  categorySlno: number | any;
  functionSlno: number | any;
  parameter: string = "";
  parameterDetail: string = "";
  originalPrefixSlno: number | any;
  unit: string = "";
  singleValue: string = "";
  highEndValue: string = "";
  lowEndValue: string = "";
  units: string = "";
  nonNumeric: string = "";
  remark: string = "";
  typeSlno: number | any;
  cell: string = "";
  cellDetail: string = "";
  organ: string = "";
  organDetail: string = "";
  species: string = "";
  speciesDetail: string = "";
  gender: string = "";
  ageGroup: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  
  ligands: Ligand001wb[] = [];
  assays: Assay001wb[] = [];
  unitsinglevalues: Unitsinglevalue001mb[] = [];
  unitlowendvalues: Unitlowendvalue001mb[] = [];
  measurement: Measurement001wb[] = [];
  categorys: Category001mb [] = [];
  categoryfunctions: Categoryfunction001mb [] = [];
  Originals: Originalprefix001mb [] = [];
  types: Type001mb [] = [];
  username:any;

  hexToRgb: any;
  rgbToHex: any;

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  constructor(private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private assayManager: AssayManager,
    private unitSingleValueManager: UnitSingleValueManager,
    private unitlowendvalueManager: UnitlowendvalueManager,
    private measurementManager: MeasurementManager,
    private categoryManager: CategoryManager,
    private categoryfunctionManager: CategoryfunctionManager,
    private originalprefixManager: OriginalprefixManager,
    private bioTypeManager: BioTypeManager,) { 
      this.frameworkComponents = {
        iconRenderer: IconRendererComponent
      }
    }

  ngOnInit(): void {
    this.username = this.authManager.getcurrentUser.username;
    // this.assayManager.allassay(this.username).subscribe(response => {
    //   this.assays = deserialize<Assay001wb[]>(Assay001wb, response);
      
      
    // });

    this.unitSingleValueManager.allunitSingleValue().subscribe(response => {
      this.unitsinglevalues = deserialize<Unitsinglevalue001mb[]>(Unitsinglevalue001mb, response);
    });

    this.unitlowendvalueManager.allunitlowendvalue().subscribe(response => {
      this.unitlowendvalues = deserialize<Unitlowendvalue001mb[]>(Unitlowendvalue001mb, response);
    });

    this.categoryManager.allcategoryType().subscribe(response => {
      this.categorys = deserialize<Category001mb[]>(Category001mb, response);
      
    });

    this.categoryfunctionManager.allcategoryFunction().subscribe(response => {
      this.categoryfunctions = deserialize<Categoryfunction001mb[]>(Categoryfunction001mb, response);
     
    });

    this.originalprefixManager.alloriginalPrefix().subscribe(response => {
      this.Originals = deserialize<Originalprefix001mb[]>(Originalprefix001mb, response);
      
    });

    this.bioTypeManager.allbioType().subscribe(response => {
      this.types = deserialize<Type001mb[]>(Type001mb, response);
     
    });

    this.createDataGrid001();

    this.MeasurementForm = this.formBuilder.group({

      dataLocator: [''],
      assaySlno: [''],
      categorySlno: ['',],
      functionSlno: [''],
      parameter: [''],
      parameterDetail: [''],
      originalPrefixSlno: [''],
      unit: [''],
      singleValue: [''],
      highEndValue: [''],
      lowEndValue: [''],
      units: [''],
      nonNumeric: [''],
      remark: [''],
      typeSlno: [''],
      cell: [''],
      cellDetail: [''],
      organ: [''],
      organDetail: [''],
      species: [''],
      speciesDetail: [''],
      gender: [''],
      ageGroup: [''],

    });


    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);
      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });

    this.loadData();
  }


  loadData() {
    this.username = this.authManager.getcurrentUser.username;
    this.measurementManager.allmeasurement(this.username).subscribe(response => {

      this.measurement = deserialize<Measurement001wb[]>(Measurement001wb, response);
      if (this.measurement.length > 0) {
        this.gridOptions?.api?.setRowData(this.measurement);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.MeasurementForm.controls; }

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
        field: 'measurementId',
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
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 80,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
        },
      },
      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 85,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },
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
      }

    ];
  }

  setVersion(params: any) {

    // return params.data.assaySlno2 ? params.data.assaySlno2.ligandSlno2?.ligandVersionSlno2?.ligandVersion : null;
  }

  setCategory(params: any){
    // return params.data.categorySlno2 ? params.data.categorySlno2.category : null;
  }

  setCategoryFunction(params: any){
    // return params.data.functionSlno2 ? params.data.functionSlno2.function : null;
  }
 
  setOriginalPrefix(params: any) {
    // return params.data.originalPrefixSlno2 ? params.data.originalPrefixSlno2.originalPrefix : null;
  }


  setTypes(params: any) {
    // return params.data.typeSlno2 ? params.data.typeSlno2.type : null;
  }

  onEditButtonClick(params: any) {
    this.measurementId = params.data.measurementId;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.MeasurementForm.patchValue({
      'dataLocator': params.data.dataLocator,
      'assaySlno': params.data.assaySlno,
      'categorySlno': params.data.categorySlno,
      'functionSlno': params.data.functionSlno,
      'parameter': params.data.parameter,
      'parameterDetail': params.data.parameterDetail,
      'originalPrefixSlno': params.data.originalPrefixSlno,
      'unit': params.data.unit,
      'singleValue': params.data.singleValue,
      'highEndValue': params.data.highEndValue,
      'lowEndValue': params.data.lowEndValue,
      'units': params.data.units,
      'nonNumeric': params.data.nonNumeric,
      'remark': params.data.remark,
      'typeSlno': params.data.typeSlno,
      'cell': params.data.cell,
      'cellDetail': params.data.cellDetail,
      'organ': params.data.organ,
      'organDetail': params.data.organDetail,
      'species': params.data.species,
      'speciesDetail': params.data.speciesDetail,
      'gender': params.data.gender,
      'ageGroup': params.data.ageGroup,

    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Measurement";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.measurementManager.measurementdelete(params.data.measurementId).subscribe((response) => {
          for (let i = 0; i < this.measurement.length; i++) {
            if (this.measurement[i].measurementId == params.data.measurementId) {
              this.measurement?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Measurement Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Measurement";
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

  onMeasurementClick(event: any, MeasurementForm: any) {

    this.markFormGroupTouched(this.MeasurementForm);
    this.submitted = true;
    if (this.MeasurementForm.invalid) {
      return;
    }

    let measurement001wb = new Measurement001wb();
    measurement001wb.dataLocator = this.f.dataLocator.value ? this.f.dataLocator.value : "";
    measurement001wb.assaySlno = this.f.assaySlno.value ? this.f.assaySlno.value : null;
    measurement001wb.categorySlno = this.f.categorySlno.value ? this.f.categorySlno.value : null;
    measurement001wb.functionSlno = this.f.functionSlno.value ? this.f.functionSlno.value : null;
    measurement001wb.parameter = this.f.parameter.value ? this.f.parameter.value : "";
    measurement001wb.parameterDetail = this.f.parameterDetail.value ? this.f.parameterDetail.value : "";
    measurement001wb.originalPrefixSlno = this.f.originalPrefixSlno.value ? this.f.originalPrefixSlno.value : null;
    measurement001wb.unit = this.f.unit.value ? this.f.unit.value : "";
    measurement001wb.singleValue = this.f.singleValue.value ? this.f.singleValue.value : "";
    measurement001wb.highEndValue = this.f.highEndValue.value ? this.f.highEndValue.value : "";
    measurement001wb.lowEndValue = this.f.lowEndValue.value ? this.f.lowEndValue.value : "";
    measurement001wb.units = this.f.units.value ? this.f.units.value : "";
    measurement001wb.nonNumeric = this.f.nonNumeric.value ? this.f.nonNumeric.value : "";
    measurement001wb.remark = this.f.remark.value ? this.f.remark.value : "";
    measurement001wb.typeSlno = this.f.typeSlno.value ? this.f.typeSlno.value : null;
    measurement001wb.cell = this.f.cell.value ? this.f.cell.value : "";
    measurement001wb.cellDetail = this.f.cellDetail.value ? this.f.cellDetail.value : "";
    measurement001wb.organ = this.f.organ.value ? this.f.organ.value : "";
    measurement001wb.organDetail = this.f.organDetail.value ? this.f.organDetail.value : "";
    measurement001wb.species = this.f.species.value ? this.f.species.value : "";
    measurement001wb.speciesDetail = this.f.speciesDetail.value ? this.f.speciesDetail.value : "";
    measurement001wb.gender = this.f.gender.value ? this.f.gender.value : "";
    measurement001wb.ageGroup = this.f.ageGroup.value ? this.f.ageGroup.value : "";
    measurement001wb.status = "SUBMITTED TO QC";


    if (this.measurementId) {
      measurement001wb.measurementId = this.measurementId;
      measurement001wb.insertUser = this.insertUser;
      measurement001wb.insertDatetime = this.insertDatetime;
      measurement001wb.updatedUser = this.authManager.getcurrentUser.username;
      measurement001wb.updatedDatetime = new Date();
      this.measurementManager.measurementupdate(measurement001wb).subscribe((response) => {

        this.calloutService.showSuccess("Measurement Details Updated Successfully");
        this.loadData();
        this.MeasurementForm.reset();
        this.measurementId = null;
        this.submitted = false;
      });
    }
    else {
      measurement001wb.insertUser = this.authManager.getcurrentUser.username;
      measurement001wb.insertDatetime = new Date();
      this.measurementManager.measurementsave(measurement001wb).subscribe((response) => {

        this.calloutService.showSuccess("Measurement Details Saved Successfully");
        this.loadData();
        this.MeasurementForm.reset();
        this.submitted = false;
      });
    }


  }

  onReset() {
    this.submitted = false;
    this.MeasurementForm.reset();
  }

  onRepeat() {
    let i = this.measurement.length - 1;
    for (i; i < this.measurement.length; i++) {
      this.MeasurementForm.patchValue({
        'dataLocator': this.measurement[i].dataLocator,
        'assaySlno': this.measurement[i].assaySlno,
        'categorySlno': this.measurement[i].categorySlno,
        'functionSlno': this.measurement[i].functionSlno,
        'parameter': this.measurement[i].parameter,
        'parameterDetail': this.measurement[i].parameterDetail,
        'originalPrefixSlno': this.measurement[i].originalPrefixSlno,
        'unit':this.measurement[i].unit,
        'singleValue': this.measurement[i].singleValue,
        'highEndValue': this.measurement[i].highEndValue,
        'lowEndValue': this.measurement[i].lowEndValue,
        'units': this.measurement[i].units,
        'nonNumeric': this.measurement[i].nonNumeric,
        'remark': this.measurement[i].remark,
        'typeSlno': this.measurement[i].typeSlno,
        'cell': this.measurement[i].cell,
        'cellDetail': this.measurement[i].cellDetail,
        'organ': this.measurement[i].organ,
        'organDetail': this.measurement[i].organDetail,
        'species': this.measurement[i].species,
        'speciesDetail': this.measurement[i].speciesDetail,
        'gender': this.measurement[i].gender,
        'ageGroup': this.measurement[i].ageGroup,
  
      });
    }
  }

  onEdit() {
    let i = this.measurement.length - 1;
    for (i; i < this.measurement.length; i++) {
      this.insertDatetime = new Date();
      this.measurementId = this.measurement[i].measurementId;
      this.MeasurementForm.patchValue({
        'dataLocator': this.measurement[i].dataLocator,
        'assaySlno': this.measurement[i].assaySlno,
        'categorySlno': this.measurement[i].categorySlno,
        'functionSlno': this.measurement[i].functionSlno,
        'parameter': this.measurement[i].parameter,
        'parameterDetail': this.measurement[i].parameterDetail,
        'originalPrefixSlno': this.measurement[i].originalPrefixSlno,
        'unit':this.measurement[i].unit,
        'singleValue': this.measurement[i].singleValue,
        'highEndValue': this.measurement[i].highEndValue,
        'lowEndValue': this.measurement[i].lowEndValue,
        'units': this.measurement[i].units,
        'nonNumeric': this.measurement[i].nonNumeric,
        'remark': this.measurement[i].remark,
        'typeSlno': this.measurement[i].typeSlno,
        'cell': this.measurement[i].cell,
        'cellDetail': this.measurement[i].cellDetail,
        'organ': this.measurement[i].organ,
        'organDetail': this.measurement[i].organDetail,
        'species': this.measurement[i].species,
        'speciesDetail': this.measurement[i].speciesDetail,
        'gender': this.measurement[i].gender,
        'ageGroup': this.measurement[i].ageGroup,
  
      });
    }
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ControllersService, GridOptions } from 'ag-grid-community';
import { forkJoin, Observable } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { CategoryFunctionPopupComponent } from 'src/app/shared/category-function-popup/category-function-popup.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { LigandDoseHighlowunitPopupComponent } from 'src/app/shared/ligand-dose-highlowunit-popup/ligand-dose-highlowunit-popup.component';
import { LigandDoseSingleunitPopupComponent } from 'src/app/shared/ligand-dose-singleunit-popup/ligand-dose-singleunit-popup.component';
import { OriginalPrefixPopupComponent } from 'src/app/shared/original-prefix-popup/original-prefix-popup.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AssayTypeManager } from 'src/app/shared/services/restcontroller/bizservice/assayType.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CategoryManager } from 'src/app/shared/services/restcontroller/bizservice/category.service';
import { CategoryfunctionManager } from 'src/app/shared/services/restcontroller/bizservice/categoryFunction.service';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { LigandVersionManager } from 'src/app/shared/services/restcontroller/bizservice/ligandVersion.service';
import { OriginalprefixManager } from 'src/app/shared/services/restcontroller/bizservice/originalPrefix.service';
import { RouteofAdminManager } from 'src/app/shared/services/restcontroller/bizservice/routeOfAdministration.service';
import { ToxicityManager } from 'src/app/shared/services/restcontroller/bizservice/toxiCity.service';
import { BioTypeManager } from 'src/app/shared/services/restcontroller/bizservice/type.service';
import { UnitlowendvalueManager } from 'src/app/shared/services/restcontroller/bizservice/Unitlowendvalue.service';
import { UnitSingleValueManager } from 'src/app/shared/services/restcontroller/bizservice/unitSingleValue.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
import { Assaytype001mb } from 'src/app/shared/services/restcontroller/entities/Assaytype001mb';
import { Category001mb } from 'src/app/shared/services/restcontroller/entities/Category001mb';
import { Categoryfunction001mb } from 'src/app/shared/services/restcontroller/entities/Categoryfunction001mb';
import { Ligand001wb } from 'src/app/shared/services/restcontroller/entities/Ligand001wb';
import { Ligandtype001mb } from 'src/app/shared/services/restcontroller/entities/Ligandtype001mb';
import { Ligandversion001mb } from 'src/app/shared/services/restcontroller/entities/Ligandversion001mb';
import { Originalprefix001mb } from 'src/app/shared/services/restcontroller/entities/Originalprefix001mb';
import { Routeofadministration001mb } from 'src/app/shared/services/restcontroller/entities/Routeofadministration001mb';
import { Toxicity001mb } from 'src/app/shared/services/restcontroller/entities/Toxicity001mb';
import { Type001mb } from 'src/app/shared/services/restcontroller/entities/Type001mb';
import { Unitlowendvalue001mb } from 'src/app/shared/services/restcontroller/entities/Unitlowendvalue001mb';
import { Unitsinglevalue001mb } from 'src/app/shared/services/restcontroller/entities/Unitsinglevalue001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { ToxicityTypePopupComponent } from 'src/app/shared/toxicity-type-popup/toxicity-type-popup.component';
import { Utils } from 'src/app/shared/utils/utils';
import { v4 as uuid } from 'uuid';
import { OriginalPrefixComponent } from '../master/original-prefix/original-prefix.component';

@Component({
  selector: 'app-assay',
  templateUrl: './assay.component.html',
  styleUrls: ['./assay.component.css']
})
export class AssayComponent implements OnInit {
  AssayForm: FormGroup | any;
  public assayGridOptions: GridOptions | any;
  frameworkComponents: any;
  submitted = false;
  tanNo: string | any = "";
  assayId?: number | any;
  ligandId: number | any;
  ligandSlno: number | any;
  ordinal: string | any;
  // collectionId: string = "";
  assayTypeSlno: number | any;
  toxiCitySlno: number | any;
  routeSlno: number | any;
  ligandSvalue: string | any;
  unitSlno: number | any;
  ligandHvalue: string | any;
  ligandLvalue: string | any;
  unitedSlno: number | any;
  administration: string | any;
  procedure: string | any;
  conditionType: string | any;
  conditionMaterial: string | any;
  conditionMaterialid: string | any;
  singleCondition: string | any;
  singleUnit: string | any;
  highCondition: string | any;
  lowCondition: string | any;
  highLowUnit: string | any;

  dataLocator1: string | any;
  dataLocator2: string | any;
  dataLocator3: string | any;
  dataLocator: string | any;
  categorySlno: number | any;
  functionSlno: number | any;
  parameter: string | any;
  parameterDetail: string | any;
  singleValue: string | any;
  unit: string | any;
  originalPrefixSlno: number | any;
  highEndValue: string | any;
  lowEndValue: string | any;
  units: string | any;
  nonNumeric: string | any;
  remark: string | any;
  typeSlno: number | any;
  cell: string | any;
  cellDetail: string | any;
  organ: string | any;
  organDetail: string | any;
  species: string | any;
  speciesDetail: string | any;
  gender?: string | any;
  ageGroup: string | any;

  target: string | any;
  targetVersion: string | any;
  targetStatus: string | any;
  collectionId1: string | any;
  original: string | any;
  acronym: string | any;
  organism: string | any;
  variant: string | any;

  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  tanarrays: any = [];
  tanarr: any = [];
  ligandtanversions: Ligand001wb[] = [];
  assay: Assay001wb[] = [];
  curatotTask: Assay001wb[] = [];
  ligands: Ligand001wb[] = [];
  assayTypes: Assaytype001mb[] = [];
  toxiCities: Toxicity001mb[] = [];
  max: number | any;
  routeAdmins: Routeofadministration001mb[] = [];
  unitsinglevalues: Unitsinglevalue001mb[] = [];
  unitlowendvalues: Unitlowendvalue001mb[] = [];
  ligandVersions: Ligandversion001mb[] = [];
  ligandtypes: Ligandtype001mb[] = [];
  ligand001mb?: Ligand001wb;
  assay001wbs?: Assay001wb;
  inProcessLigand: Assay001wb[] = [];
  tanGridassay: Assay001wb[] = [];

  categorys: Category001mb[] = [];
  categoryfunctions: Categoryfunction001mb[] = [];
  Originals: Originalprefix001mb[] = [];
  types: Type001mb[] = [];
  hexToRgb: any;
  rgbToHex: any;

  rowData: Observable<any[]> | any;
  username: any;
  rolename?: string = "";
  user?: User001mb;
  collectionId: string = "";
  public inprocess: any;

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private http: HttpClient,
    private modalService: NgbModal,
    private assayManager: AssayManager,
    private ligandManager: LigandManager,
    private assayTypeManager: AssayTypeManager,
    private toxicityManager: ToxicityManager,
    private routeofAdminManager: RouteofAdminManager,
    private unitSingleValueManager: UnitSingleValueManager,
    private unitlowendvalueManager: UnitlowendvalueManager,
    private ligandVersionManager: LigandVersionManager,
    private categoryManager: CategoryManager,
    private categoryfunctionManager: CategoryfunctionManager,
    private originalprefixManager: OriginalprefixManager,
    private bioTypeManager: BioTypeManager,
    private route: ActivatedRoute) {

    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }

  }



  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { [x: string]: any; }) => {
      this.assayId = params["assayId"];
      this.ligandId = params["ligandId"];
      this.tanNo = params["tanNumber"];

      this.ligandManager.findAllByLigandIdAndAssayId(this.ligandId, this.assayId).subscribe(response => {
        let ligand = deserialize<Ligand001wb>(Ligand001wb, response);
        let AssayId = ligand.assay001wbs[0]?.assayId;
        this.assayId = AssayId;

        let InsertUser = ligand.assay001wbs[0]?.insertUser;
        this.insertUser = InsertUser;

        let LigandSlno = ligand.assay001wbs[0]?.ligandSlno;
        this.ligandSlno = LigandSlno;

        let AssayType = ligand.assay001wbs[0]?.assayTypeSlno;
        this.assayTypeSlno = AssayType;

        let ToxiCity = ligand.assay001wbs[0]?.toxiCitySlno;
        this.toxiCitySlno = ToxiCity;

        let Route = ligand.assay001wbs[0]?.routeSlno;
        this.routeSlno = Route;

        let Administration = ligand.assay001wbs[0]?.administration;
        this.administration = Administration;

        let Procedure = ligand.assay001wbs[0]?.procedure;
        this.procedure = Procedure;

        let LigandSvalue = ligand.assay001wbs[0]?.ligandSvalue;
        this.ligandSvalue = LigandSvalue;

        let Unit = ligand.assay001wbs[0]?.unitSlno;
        this.unitSlno = Unit;

        let LigandHvalue = ligand.assay001wbs[0]?.ligandHvalue;
        this.ligandHvalue = LigandHvalue;

        let LigandLvalue = ligand.assay001wbs[0]?.ligandLvalue;
        this.ligandLvalue = LigandLvalue;

        let UnitedSlno = ligand.assay001wbs[0]?.unitedSlno;
        this.unitedSlno = UnitedSlno;

        let ConditionType = ligand.assay001wbs[0]?.conditionType;
        this.conditionType = ConditionType;

        let ConditionMaterial = ligand.assay001wbs[0]?.conditionMaterial;
        this.conditionMaterial = ConditionMaterial;

        let ConditionMaterialid = ligand.assay001wbs[0]?.conditionMaterialid;
        this.conditionMaterialid = ConditionMaterialid;

        let SingleCondition = ligand.assay001wbs[0]?.singleCondition;
        this.singleCondition = SingleCondition;

        let Units = ligand.assay001wbs[0]?.singleUnit;
        this.singleUnit = Units;

        let HighCondition = ligand.assay001wbs[0]?.highCondition;
        this.highCondition = HighCondition;

        let LowCondition = ligand.assay001wbs[0]?.lowCondition;
        this.lowCondition = LowCondition;

        let HighLowUnit = ligand.assay001wbs[0]?.highLowUnit;
        this.highLowUnit = HighLowUnit;

        let DataLocator1 = ligand.assay001wbs[0]?.dataLocator1;
        this.dataLocator1 = DataLocator1;

        let DataLocator2 = ligand.assay001wbs[0]?.dataLocator2;
        this.dataLocator2 = DataLocator2;

        let DataLocator3 = ligand.assay001wbs[0]?.dataLocator3;
        this.dataLocator3 = DataLocator3;

        let Category = ligand.assay001wbs[0]?.categorySlno;
        this.categorySlno = Category;

        let Function = ligand.assay001wbs[0]?.functionSlno;
        this.functionSlno = Function;

        let Parameter = ligand.assay001wbs[0]?.parameter;
        this.parameter = Parameter;

        let ParameterDetail = ligand.assay001wbs[0]?.parameterDetail;
        this.parameterDetail = ParameterDetail;

        let OriginalPrefixSlno = ligand.assay001wbs[0]?.originalPrefixSlno;
        this.originalPrefixSlno = OriginalPrefixSlno;

        let SingleValue = ligand.assay001wbs[0]?.singleValue;
        this.singleValue = SingleValue;

        let Measurementunits = ligand.assay001wbs[0]?.unit;
        this.unit = Measurementunits;

        let HighEndValue = ligand.assay001wbs[0]?.highEndValue;
        this.highEndValue = HighEndValue;

        let LowEndValue = ligand.assay001wbs[0]?.lowEndValue;
        this.lowEndValue = LowEndValue;

        let MeasurementunitedSlno = ligand.assay001wbs[0]?.units;
        this.units = MeasurementunitedSlno;

        let NonNumeric = ligand.assay001wbs[0]?.nonNumeric;
        this.nonNumeric = NonNumeric;

        let Remark = ligand.assay001wbs[0]?.remark;
        this.remark = Remark;

        let Type = ligand.assay001wbs[0]?.typeSlno;
        this.typeSlno = Type;

        let Cell = ligand.assay001wbs[0]?.cell;
        this.cell = Cell;

        let CellDetail = ligand.assay001wbs[0]?.cellDetail;
        this.cellDetail = CellDetail;

        let Organ = ligand.assay001wbs[0]?.organ;
        this.organ = Organ;

        let OrganDetail = ligand.assay001wbs[0]?.organDetail;
        this.organDetail = OrganDetail;

        let Species = ligand.assay001wbs[0]?.species;
        this.species = Species;

        let SpeciesDetail = ligand.assay001wbs[0]?.speciesDetail;
        this.speciesDetail = SpeciesDetail;

        let Gender = ligand.assay001wbs[0]?.gender;
        this.gender = Gender;

        let AgeGroup = ligand.assay001wbs[0]?.ageGroup;
        this.ageGroup = AgeGroup;

        let TargetVersion = ligand.assay001wbs[0]?.targetVersion;
        this.targetVersion = TargetVersion;

        let CollectionId1 = ligand.assay001wbs[0]?.collectionId1;
        this.collectionId1 = CollectionId1;

        let Original = ligand.assay001wbs[0]?.original;
        this.original = Original;

        let Acronym = ligand.assay001wbs[0]?.acronym;
        this.acronym = Acronym;

        let Organism = ligand.assay001wbs[0]?.organism;
        this.organism = Organism;

        let Variant = ligand.assay001wbs[0]?.variant;
        this.variant = Variant;



      });

      // this.assayManager.findAllByLigandIdAndAssayId(this.assayId).subscribe(response => {
      //   this.ligandAndAssayId = deserialize<Assay001wb[]>(Assay001wb, response);

      //   });

      //   let AssayType =  this.ligandAndAssayId[0].assayTypeSlno;
      //     this.assayTypeSlno = AssayType;



    });
    this.AssayForm = this.formBuilder.group({
      tanNo: [''],
      ligandSlno: [''],
      assayTypeSlno: [],
      toxiCitySlno: [''],
      routeSlno: [''],
      ligandSvalue: [''],
      unitSlno: [''],
      ligandHvalue: [''],
      ligandLvalue: [''],
      unitedSlno: [''],
      administration: [''],
      procedure: [''],
      conditionType: [''],
      conditionMaterial: [''],
      singleCondition: [''],
      singleUnit: [''],
      highCondition: [''],
      lowCondition: [''],
      highLowUnit: [''],
      conditionMaterialid: [''],
      ligandname: [''],
      dataLocator1: [''],
      dataLocator2: [''],
      dataLocator3: [''],
      categorySlno: [''],
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
      targetVersion: [''],
      collectionId1: [''],
      original: [''],
      acronym: [''],
      organism: [''],
      variant: [''],
    });

    this.createDataGrid001();

    this.username = this.authManager.getcurrentUser.username;

    let res1 = this.ligandManager.allligand(this.username);
    let res2 = this.assayTypeManager.allassayType();
    let res3 = this.toxicityManager.alltoxicityType();
    let res4 = this.routeofAdminManager.allrouteofadminType();
    let res5 = this.unitSingleValueManager.allunitSingleValue();
    let res6 = this.unitlowendvalueManager.allunitlowendvalue();
    let res7 = this.categoryManager.allcategoryType();
    let res8 = this.categoryfunctionManager.allcategoryFunction();
    let res9 = this.originalprefixManager.alloriginalPrefix();
    let res10 = this.bioTypeManager.allbioType();

    forkJoin([res1, res2, res3, res4, res5, res6, res7, res8, res9, res10]).subscribe(data => {
      // res1
      this.ligands = deserialize<Ligand001wb[]>(Ligand001wb, data[0]);
      for (let i = 0; i < this.ligands.length; i++) {
        this.tanarrays.push(this.ligands[i].tanNumber)
      }
      this.tanarr = new Set(this.tanarrays);
      let j = this.ligands.length - 1;
      for (j; j < this.ligands.length; j++) {
        this.AssayForm.patchValue({
          tanNo: this.ligands[j]?.tanNumber,
        });
      }
      //res2
      this.assayTypes = deserialize<Assaytype001mb[]>(Assaytype001mb, data[1]);
      this.toxiCities = deserialize<Toxicity001mb[]>(Toxicity001mb, data[2]);
      this.routeAdmins = deserialize<Routeofadministration001mb[]>(Routeofadministration001mb, data[3]);
      this.unitsinglevalues = deserialize<Unitsinglevalue001mb[]>(Unitsinglevalue001mb, data[4]);
      this.unitlowendvalues = deserialize<Unitlowendvalue001mb[]>(Unitlowendvalue001mb, data[5]);
      this.categorys = deserialize<Category001mb[]>(Category001mb, data[6]);
      this.categoryfunctions = deserialize<Categoryfunction001mb[]>(Categoryfunction001mb, data[7]);
      this.Originals = deserialize<Originalprefix001mb[]>(Originalprefix001mb, data[8]);
      this.types = deserialize<Type001mb[]>(Type001mb, data[9]);
      this.loadData();
      setTimeout(() => {
        this.AssayForm.patchValue({
          tanNo: this.tanNo,
          ligandSlno: this.ligandSlno,
          assayTypeSlno: this.assayTypeSlno,
          toxiCitySlno: this.toxiCitySlno,
          routeSlno: this.routeSlno,
          ligandSvalue: this.ligandSvalue,
          unitSlno: this.unitSlno,
          ligandHvalue: this.ligandHvalue,
          ligandLvalue: this.ligandLvalue,
          unitedSlno: this.unitedSlno,
          administration: this.administration,
          procedure: this.procedure,
          conditionType: this.conditionType,
          conditionMaterial: this.conditionMaterial,
          singleCondition: this.singleCondition,
          singleUnit: this.singleUnit,
          highCondition: this.highCondition,
          lowCondition: this.lowCondition,
          highLowUnit: this.highLowUnit,
          conditionMaterialid: this.conditionMaterialid,
          ligandname: '',
          dataLocator1: this.dataLocator1,
          dataLocator2: this.dataLocator2,
          dataLocator3: this.dataLocator3,
          categorySlno: this.categorySlno,
          functionSlno: this.functionSlno,
          parameter: this.parameter,
          parameterDetail: this.parameterDetail,
          originalPrefixSlno: this.originalPrefixSlno,
          unit: this.unit,
          singleValue: this.singleValue,
          highEndValue: this.highEndValue,
          lowEndValue: this.lowEndValue,
          units: this.units,
          nonNumeric: this.nonNumeric,
          remark: this.remark,
          typeSlno: this.typeSlno,
          cell: this.cell,
          cellDetail: this.cellDetail,
          organ: this.organ,
          organDetail: this.organDetail,
          species: this.species,
          speciesDetail: this.speciesDetail,
          gender: this.gender,
          ageGroup: this.ageGroup,
          targetVersion: this.targetVersion,
          collectionId1: this.collectionId1,
          original: this.original,
          acronym: this.acronym,
          organism: this.organism,
          variant: this.variant
        });
        for (let tannumber of this.ligands) {
          if ((tannumber.tanNumber == this.f.tanNo.value) && (tannumber.ligandId == this.ligandSlno)) {
            if (tannumber.identifier1) {
              this.AssayForm.patchValue({
                'ligandname': tannumber.identifier1,
              });
            } else {
              this.AssayForm.patchValue({
                'ligandname': tannumber.locator,
              });
            }
            break;
          }
        }
      }, 10);
    });

    this.authManager.currentUserSubject.subscribe((object: any) => {
      this.user = object;
      let rgb = Utils.hexToRgb(object.theme);
      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });
    this.AssayForm.get('tanNo').valueChanges.subscribe((value: any) => {
      this.tanNo = value;
      this.ligandtanversions = [];
      let legandversions = [];
      for (let i = 0; i < this.ligands.length; i++) {
        if (this.ligands[i].tanNumber == value) {
          legandversions.push(this.ligands[i].ligandVersionSlno);
        }
        if (this.ligands[i].tanNumber == value) {
          this.ligandtanversions.push(this.ligands[i]);
        }
      }

      if (legandversions.length < 1) {
        this.AssayForm.patchValue({
          'ligandSlno': legandversions[0],
        });
      }
    });

    this.AssayForm.get('ligandSlno').valueChanges.subscribe((value: any) => {
      for (let tannumber of this.ligands) {
        if ((tannumber.tanNumber == this.f.tanNo.value) && (tannumber.ligandId == value)) {
          if (tannumber.identifier1) {
            this.AssayForm.patchValue({
              'ligandname': tannumber.identifier1,
            });
          } else {
            this.AssayForm.patchValue({
              'ligandname': tannumber.locator,
            });
          }
          break;
        }
      }
    });

  }

  loadData() {
    this.username = this.authManager.getcurrentUser.username;
    if (this.tanNo) {
      console.log("Testing");
      this.assayGridOptions?.api?.setRowData([]);
      this.assayManager.allassayTan(this.username, this.tanNo).subscribe(response => {
        setTimeout(() => {
          this.tanGridassay = response;
          if (this.tanGridassay) {
            this.assayGridOptions?.api?.setRowData(this.tanGridassay);
          } else {
            this.assayGridOptions?.api?.setRowData([]);
          }
        }, 100);
      });
    }



    this.assayManager.allassay(this.username).subscribe(response => {
      this.assay = deserialize<Assay001wb[]>(Assay001wb, response);

      // if (this.assay.length > 0) {
      //   this.assayGridOptions?.api?.setRowData(this.assay);
      // } else {
      //   this.assayGridOptions?.api?.setRowData([]);
      // }
    });


  }




  get f() { return this.AssayForm.controls; }

  createDataGrid001(): void {
    this.assayGridOptions = {
      paginationPageSize: 100,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.assayGridOptions.editType = 'fullRow';
    this.assayGridOptions.enableRangeSelection = true;
    this.assayGridOptions.animateRows = true;

    this.assayGridOptions.columnDefs = [
      // {
      //   headerName: 'Sl-No',
      //   field: 'assayId',
      //   width: 200,
      //   // flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   headerCheckboxSelection: true,
      //   headerCheckboxSelectionFilteredOnly: true,
      //   checkboxSelection: true,
      //   suppressSizeToFit: true,
      // },
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
        headerName: 'Ligand-Version',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setVersion.bind(this)
      },
      // {
      //   headerName: 'Ordinal',
      //   field: 'ordinal',
      //   width: 200,
      //   // flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true
      // },

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

      {
        headerName: 'TARGET VERSION',
        field: 'targetVersion',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'COLLETION ID',
        field: 'collectionId1',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'ORIGINAL-TARGET-NAME',
        field: 'original',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'ACRONYM',
        field: 'acronym',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'ORGANISM-SOURCE',
        field: 'organism',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'VARIANT',
        field: 'variant',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
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

  setCategory(params: any) {
    return params.data.categorySlno2 ? params.data.categorySlno2.category : null;
  }

  setCategoryFunction(params: any) {
    return params.data.functionSlno2 ? params.data.functionSlno2.function : null;
  }

  setOriginalPrefix(params: any) {
    return params.data.originalPrefixSlno2 ? params.data.originalPrefixSlno2.originalPrefix : null;
  }


  setTypes(params: any) {
    return params.data.typeSlno2 ? params.data.typeSlno2.type : null;
  }


  onEditButtonClick(params: any) {
    if (params.data.status != "Submitted to QC") {
      this.assayId = params.data.assayId;
      this.insertUser = params.data.insertUser;
      this.insertDatetime = params.data.insertDatetime;
      this.AssayForm.patchValue({
        'ordinal': params.data.ordinal,
        'ligandSlno': params.data.ligandSlno,
        'assayTypeSlno': params.data.assayTypeSlno,
        'toxiCitySlno': params.data.toxiCitySlno,
        'routeSlno': params.data.routeSlno,
        'ligandSvalue': params.data.ligandSvalue,
        'unitSlno': params.data.unitSlno,
        'ligandHvalue': params.data.ligandHvalue,
        'ligandLvalue': params.data.ligandLvalue,
        'unitedSlno': params.data.unitedSlno,
        'administration': params.data.administration,
        'procedure': params.data.procedure,
        'conditionType': params.data.conditionType,
        'conditionMaterial': params.data.conditionMaterial,
        'conditionMaterialid': params.data.conditionMaterialid,
        'singleCondition': params.data.singleCondition,
        'singleUnit': params.data.singleUnit,
        'highCondition': params.data.highCondition,
        'lowCondition': params.data.lowCondition,
        'highLowUnit': params.data.highLowUnit,

        // 'dataLocator': this.assay[i].dataLocator,
        'dataLocator1': params.data.dataLocator1,
        'dataLocator2': params.data.dataLocator2,
        'dataLocator3': params.data.dataLocator3,
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


        'targetVersion': params.data.targetVersion,
        'collectionId1': params.data.collectionId1,
        'original': params.data.original,
        'acronym': params.data.acronym,
        'organism': params.data.organism,
        'variant': params.data.variant,
      });
    }
  }


  onDeleteButtonClick(params: any) {
    if (params.data.status != "Submitted to Qc") {
      const modalRef = this.modalService.open(ConformationComponent);
      modalRef.componentInstance.details = "Assay";
      modalRef.componentInstance.description = "Are you sure want to delete Assay ?";
      modalRef.result.then((data) => {
        if (data == "Yes") {
          this.assayManager.assaydelete(params.data.assayId).subscribe((response) => {
            for (let i = 0; i < this.assay.length; i++) {
              if (this.assay[i].assayId == params.data.assayId) {
                this.assay?.splice(i, 1);
                break;
              }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.assayGridOptions.api.deselectAll();
            this.calloutService.showSuccess("Assay Removed Successfully");
          });
        }
      })
    }
  }


  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Assay";
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

  onAssayClick(event: any, AssayForm: any) {
    this.markFormGroupTouched(this.AssayForm);
    this.submitted = true;
    if (this.AssayForm.invalid) {
      return;
    }
    let dataLocatorCount: number = 0;
    if (this.f.dataLocator1.value) {
      dataLocatorCount++;
    }
    if (this.f.dataLocator2.value) {
      dataLocatorCount++;
    }
    if (this.f.dataLocator3.value) {
      dataLocatorCount++;
    }
    if (dataLocatorCount != 1) {
      this.calloutService.showWarning("Please Enter Any One DataLocater");
      return;
    }


    let assay001wb = new Assay001wb();

    // assay001wb.ordinal = this.f.ordinal.value ? this.f.ordinal.value : "";
    assay001wb.collectionId = "47498009Q-1";
    assay001wb.ligandSlno = this.f.ligandSlno.value ? this.f.ligandSlno.value : null;
    assay001wb.assayTypeSlno = this.f.assayTypeSlno.value ? this.f.assayTypeSlno.value : null;
    assay001wb.toxiCitySlno = this.f.toxiCitySlno.value ? this.f.toxiCitySlno.value : null;
    assay001wb.routeSlno = this.f.routeSlno.value ? this.f.routeSlno.value : null;
    assay001wb.ligandSvalue = this.f.ligandSvalue.value ? this.f.ligandSvalue.value : "";
    assay001wb.unitSlno = this.f.unitSlno.value ? this.f.unitSlno.value : null;
    assay001wb.ligandHvalue = this.f.ligandHvalue.value ? this.f.ligandHvalue.value : "";
    assay001wb.ligandLvalue = this.f.ligandLvalue.value ? this.f.ligandLvalue.value : "";
    assay001wb.unitedSlno = this.f.unitedSlno.value ? this.f.unitedSlno.value : null;
    assay001wb.administration = this.f.administration.value ? this.f.administration.value : "";
    assay001wb.procedure = this.f.procedure.value ? this.f.procedure.value : "";
    assay001wb.target = "bioactivity-target" + "/" + "saturoglobal" + "/" + this.ligand001mb?.tanNumber + "/" + this.ligand001mb?.ligandVersionSlno2?.ligandVersion + "/" + this.f.targetVersion.value + ">" + "bioactivity-target" + "/" + uuid();
    assay001wb.conditionType = this.f.conditionType.value ? this.f.conditionType.value : "";
    assay001wb.conditionMaterial = this.f.conditionMaterial.value ? this.f.conditionMaterial.value : "";
    assay001wb.conditionMaterialid = this.f.conditionMaterialid.value ? this.f.conditionMaterialid.value : "";
    assay001wb.singleCondition = this.f.singleCondition.value ? this.f.singleCondition.value : "";
    assay001wb.singleUnit = this.f.singleUnit.value ? this.f.singleUnit.value : "";
    assay001wb.highCondition = this.f.highCondition.value ? this.f.highCondition.value : "";
    assay001wb.lowCondition = this.f.lowCondition.value ? this.f.lowCondition.value : "";
    assay001wb.highLowUnit = this.f.highLowUnit.value ? this.f.highLowUnit.value : "";
    assay001wb.status = "Before submit the data";
    assay001wb.targetStatus = "embargoed";

    assay001wb.dataLocator = null;
    assay001wb.dataLocator1 = this.f.dataLocator1.value ? this.f.dataLocator1.value : null;
    assay001wb.dataLocator2 = this.f.dataLocator2.value ? this.f.dataLocator2.value : null;
    assay001wb.dataLocator3 = this.f.dataLocator3.value ? this.f.dataLocator3.value : null;
    assay001wb.categorySlno = this.f.categorySlno.value ? this.f.categorySlno.value : null;
    assay001wb.functionSlno = this.f.functionSlno.value ? this.f.functionSlno.value : null;
    assay001wb.parameter = this.f.parameter.value ? this.f.parameter.value : "";
    assay001wb.parameterDetail = this.f.parameterDetail.value ? this.f.parameterDetail.value : "";
    assay001wb.originalPrefixSlno = this.f.originalPrefixSlno.value ? this.f.originalPrefixSlno.value : null;
    assay001wb.unit = this.f.unit.value ? this.f.unit.value : "";
    assay001wb.singleValue = this.f.singleValue.value ? this.f.singleValue.value : "";
    assay001wb.highEndValue = this.f.highEndValue.value ? this.f.highEndValue.value : "";
    assay001wb.lowEndValue = this.f.lowEndValue.value ? this.f.lowEndValue.value : "";
    assay001wb.units = this.f.units.value ? this.f.units.value : "";
    assay001wb.nonNumeric = this.f.nonNumeric.value ? this.f.nonNumeric.value : "";
    assay001wb.remark = this.f.remark.value ? this.f.remark.value : "";
    assay001wb.typeSlno = this.f.typeSlno.value ? this.f.typeSlno.value : null;
    assay001wb.cell = this.f.cell.value ? this.f.cell.value : "";
    assay001wb.cellDetail = this.f.cellDetail.value ? this.f.cellDetail.value : "";
    assay001wb.organ = this.f.organ.value ? this.f.organ.value : "";
    assay001wb.organDetail = this.f.organDetail.value ? this.f.organDetail.value : "";
    assay001wb.species = this.f.species.value ? this.f.species.value : "";
    assay001wb.speciesDetail = this.f.speciesDetail.value ? this.f.speciesDetail.value : "";
    assay001wb.gender = this.f.gender.value ? this.f.gender.value : "";
    assay001wb.ageGroup = this.f.ageGroup.value ? this.f.ageGroup.value : "";

    // assay001wb.target = "bioactivity-target" + "/" + "SaturoGlobal" + "/" + this.f.tanNumber.value + "/" + this.f.ligandVersionSlno.value + ">" + "bioactivity-target" + "/" + uuid();

    assay001wb.targetStatus = "embargoed";
    assay001wb.targetVersion = this.f.targetVersion.value ? this.f.targetVersion.value : "";
    assay001wb.collectionId1 = this.f.collectionId1.value ? this.f.collectionId1.value : "";
    assay001wb.original = this.f.original.value ? this.f.original.value : "";
    assay001wb.acronym = this.f.acronym.value ? this.f.acronym.value : "";
    assay001wb.organism = this.f.organism.value ? this.f.organism.value : "";
    assay001wb.variant = this.f.variant.value ? this.f.variant.value : "";
    if (this.assayId) {
      assay001wb.assayId = this.assayId;
      assay001wb.insertUser = this.insertUser;
      assay001wb.insertDatetime = this.insertDatetime;
      assay001wb.updatedUser = this.authManager.getcurrentUser.username;
      assay001wb.updatedDatetime = new Date();
      this.assayManager.assayupdate(assay001wb).subscribe((response) => {
        this.calloutService.showSuccess("Assay Details Updated Successfully and \n Details Not Sent to Reviewer");
        setTimeout(() => {
          this.loadData();
        }, 100);
        this.AssayForm.reset();
        this.assayId = null;
        this.submitted = false;
      });
    }
    else {
      let res = this.assayManager.findAllByTanligandID(this.f.ligandSlno.value);
      forkJoin([res]).subscribe(data => {
        let assay = data[0];
        if (assay.length > 0) {
          const modalRef = this.modalService.open(ConformationComponent);
          modalRef.componentInstance.details = "Assay";
          modalRef.componentInstance.description = "Existing Ligand Version is repeated.  Are you sure want to Save Assay ?";
          modalRef.result.then((data) => {
            if (data == "Yes") {
              assay001wb.insertUser = this.authManager.getcurrentUser.username;
              assay001wb.insertDatetime = new Date();
              this.assayManager.assaysave(assay001wb).subscribe((response) => {

                this.calloutService.showSuccess("Assay Details Saved Successfully and  Details Not Sent to Reviewer");
                setTimeout(() => {
                  this.loadData();
                }, 100);
                this.onReset();
                this.submitted = false;
              });
            }
          });
        } else {
          assay001wb.insertUser = this.authManager.getcurrentUser.username;
          assay001wb.insertDatetime = new Date();
          this.assayManager.assaysave(assay001wb).subscribe((response) => {
            this.calloutService.showSuccess("Assay Details Saved Successfully and \n Details Not Sent to Reviewer");
            setTimeout(() => {
              this.loadData();
            }, 100);
            this.onReset();
            this.submitted = false;
          });
        }
      });
    }


  }

  // toggleInprocess(event: any, AssayForm: any) {

  //   this.markFormGroupTouched(this.AssayForm);
  //   this.submitted = true;
  //   if (this.AssayForm.invalid) {
  //     return;
  //   }
  //   let dataLocatorCount: number = 0;
  //   if (this.f.dataLocator1.value) {
  //     dataLocatorCount++;
  //   }
  //   if (this.f.dataLocator2.value) {
  //     dataLocatorCount++;
  //   }
  //   if (this.f.dataLocator3.value) {
  //     dataLocatorCount++;
  //   }
  //   if (dataLocatorCount != 1) {
  //     this.calloutService.showWarning("Please Enter Any One DataLocater");
  //     return;
  //   }

  //   let assay001wb = new Assay001wb();

  //   // assay001wb.ordinal = this.f.ordinal.value ? this.f.ordinal.value : "";
  //   assay001wb.collectionId = "47498009Q-1";
  //   assay001wb.ligandSlno = this.f.ligandSlno.value ? this.f.ligandSlno.value : null;
  //   assay001wb.assayTypeSlno = this.f.assayTypeSlno.value ? this.f.assayTypeSlno.value : null;
  //   assay001wb.toxiCitySlno = this.f.toxiCitySlno.value ? this.f.toxiCitySlno.value : null;
  //   assay001wb.routeSlno = this.f.routeSlno.value ? this.f.routeSlno.value : null;
  //   assay001wb.ligandSvalue = this.f.ligandSvalue.value ? this.f.ligandSvalue.value : "";
  //   assay001wb.unitSlno = this.f.unitSlno.value ? this.f.unitSlno.value : null;
  //   assay001wb.ligandHvalue = this.f.ligandHvalue.value ? this.f.ligandHvalue.value : "";
  //   assay001wb.ligandLvalue = this.f.ligandLvalue.value ? this.f.ligandLvalue.value : "";
  //   assay001wb.unitedSlno = this.f.unitedSlno.value ? this.f.unitedSlno.value : null;
  //   assay001wb.administration = this.f.administration.value ? this.f.administration.value : "";
  //   assay001wb.procedure = this.f.procedure.value ? this.f.procedure.value : "";
  //   assay001wb.target = "bioactivity-target" + "/" + "saturoglobal" + "/" + this.ligand001mb?.tanNumber + "/" + this.ligand001mb?.ligandVersionSlno2?.ligandVersion + "/" + this.f.targetVersion.value + ">" + "bioactivity-target" + "/" + uuid();
  //   assay001wb.conditionType = this.f.conditionType.value ? this.f.conditionType.value : "";
  //   assay001wb.conditionMaterial = this.f.conditionMaterial.value ? this.f.conditionMaterial.value : "";
  //   assay001wb.conditionMaterialid = this.f.conditionMaterialid.value ? this.f.conditionMaterialid.value : "";
  //   assay001wb.singleCondition = this.f.singleCondition.value ? this.f.singleCondition.value : "";
  //   assay001wb.singleUnit = this.f.singleUnit.value ? this.f.singleUnit.value : "";
  //   assay001wb.highCondition = this.f.highCondition.value ? this.f.highCondition.value : "";
  //   assay001wb.lowCondition = this.f.lowCondition.value ? this.f.lowCondition.value : "";
  //   assay001wb.highLowUnit = this.f.highLowUnit.value ? this.f.highLowUnit.value : "";
  //   assay001wb.status = "In Process";
  //   assay001wb.targetStatus = "embargoed";

  //   assay001wb.dataLocator = null;
  //   assay001wb.dataLocator1 = this.f.dataLocator1.value ? this.f.dataLocator1.value : "";
  //   assay001wb.dataLocator2 = this.f.dataLocator2.value ? this.f.dataLocator2.value : "";
  //   assay001wb.dataLocator3 = this.f.dataLocator3.value ? this.f.dataLocator3.value : "";
  //   assay001wb.categorySlno = this.f.categorySlno.value ? this.f.categorySlno.value : null;
  //   assay001wb.functionSlno = this.f.functionSlno.value ? this.f.functionSlno.value : null;
  //   assay001wb.parameter = this.f.parameter.value ? this.f.parameter.value : "";
  //   assay001wb.parameterDetail = this.f.parameterDetail.value ? this.f.parameterDetail.value : "";
  //   assay001wb.originalPrefixSlno = this.f.originalPrefixSlno.value ? this.f.originalPrefixSlno.value : null;
  //   assay001wb.unit = this.f.unit.value ? this.f.unit.value : "";
  //   assay001wb.singleValue = this.f.singleValue.value ? this.f.singleValue.value : "";
  //   assay001wb.highEndValue = this.f.highEndValue.value ? this.f.highEndValue.value : "";
  //   assay001wb.lowEndValue = this.f.lowEndValue.value ? this.f.lowEndValue.value : "";
  //   assay001wb.units = this.f.units.value ? this.f.units.value : "";
  //   assay001wb.nonNumeric = this.f.nonNumeric.value ? this.f.nonNumeric.value : "";
  //   assay001wb.remark = this.f.remark.value ? this.f.remark.value : "";
  //   assay001wb.typeSlno = this.f.typeSlno.value ? this.f.typeSlno.value : null;
  //   assay001wb.cell = this.f.cell.value ? this.f.cell.value : "";
  //   assay001wb.cellDetail = this.f.cellDetail.value ? this.f.cellDetail.value : "";
  //   assay001wb.organ = this.f.organ.value ? this.f.organ.value : "";
  //   assay001wb.organDetail = this.f.organDetail.value ? this.f.organDetail.value : "";
  //   assay001wb.species = this.f.species.value ? this.f.species.value : "";
  //   assay001wb.speciesDetail = this.f.speciesDetail.value ? this.f.speciesDetail.value : "";
  //   assay001wb.gender = this.f.gender.value ? this.f.gender.value : "";
  //   assay001wb.ageGroup = this.f.ageGroup.value ? this.f.ageGroup.value : "";

  //   // assay001wb.target = "bioactivity-target" + "/" + "SaturoGlobal" + "/" + this.f.tanNumber.value + "/" + this.f.ligandVersionSlno.value + ">" + "bioactivity-target" + "/" + uuid();

  //   assay001wb.targetStatus = "embargoed";
  //   assay001wb.targetVersion = this.f.targetVersion.value ? this.f.targetVersion.value : "";
  //   assay001wb.collectionId1 = this.f.collectionId1.value ? this.f.collectionId1.value : "";
  //   assay001wb.original = this.f.original.value ? this.f.original.value : "";
  //   assay001wb.acronym = this.f.acronym.value ? this.f.acronym.value : "";
  //   assay001wb.organism = this.f.organism.value ? this.f.organism.value : "";
  //   assay001wb.variant = this.f.variant.value ? this.f.variant.value : "";
  //   // if (this.assayId) {
  //   //   assay001wb.assayId = this.assayId;
  //   //   assay001wb.insertUser = this.insertUser;
  //   //   assay001wb.insertDatetime = this.insertDatetime;
  //   //   assay001wb.updatedUser = this.authManager.getcurrentUser.username;
  //   //   assay001wb.updatedDatetime = new Date();
  //   //   this.assayManager.assayupdate(assay001wb).subscribe((response) => {
  //   //     this.calloutService.showSuccess("Assay Details Updated Successfully");
  //   //     this.loadData();
  //   //     this.AssayForm.reset();
  //   //     this.assayId = null;
  //   //     this.submitted = false;
  //   //   });
  //   // }
  //   // else {
  //   assay001wb.insertUser = this.authManager.getcurrentUser.username;
  //   assay001wb.insertDatetime = new Date();
  //   this.assayManager.assaysave(assay001wb).subscribe((response) => {
  //     this.calloutService.showWarning("Assay details are in process");
  //     this.loadData();
  //     this.onReset();
  //     this.submitted = false;
  //   });
  //   // }

  // }

  onReset() {
    this.AssayForm.get('ligandSlno').reset();
    this.AssayForm.get('ligandname').reset();
    this.AssayForm.get('assayTypeSlno').reset();
    this.AssayForm.get('toxiCitySlno').reset();
    this.AssayForm.get('routeSlno').reset();
    this.AssayForm.get('ligandSvalue').reset();
    this.AssayForm.get('unitSlno').reset();
    this.AssayForm.get('ligandHvalue').reset();
    this.AssayForm.get('ligandLvalue').reset();
    this.AssayForm.get('unitedSlno').reset();
    this.AssayForm.get('administration').reset();
    this.AssayForm.get('procedure').reset();
    this.AssayForm.get('conditionType').reset();
    this.AssayForm.get('conditionMaterial').reset();
    this.AssayForm.get('conditionMaterialid').reset();
    this.AssayForm.get('singleCondition').reset();
    this.AssayForm.get('singleUnit').reset();
    this.AssayForm.get('highCondition').reset();
    this.AssayForm.get('lowCondition').reset();
    this.AssayForm.get('highLowUnit').reset();
    this.AssayForm.get('dataLocator1').reset();
    this.AssayForm.get('dataLocator2').reset();
    this.AssayForm.get('dataLocator3').reset();
    this.AssayForm.get('categorySlno').reset();
    this.AssayForm.get('functionSlno').reset();
    this.AssayForm.get('parameter').reset();
    this.AssayForm.get('parameterDetail').reset();
    this.AssayForm.get('originalPrefixSlno').reset();
    this.AssayForm.get('unit').reset();
    this.AssayForm.get('singleValue').reset();
    this.AssayForm.get('highEndValue').reset();
    this.AssayForm.get('lowEndValue').reset();

    this.AssayForm.get('units').reset();
    this.AssayForm.get('nonNumeric').reset();
    this.AssayForm.get('remark').reset();
    this.AssayForm.get('typeSlno').reset();
    this.AssayForm.get('cell').reset();
    this.AssayForm.get('cellDetail').reset();
    this.AssayForm.get('organ').reset();
    this.AssayForm.get('organDetail').reset();

    this.AssayForm.get('species').reset();
    this.AssayForm.get('speciesDetail').reset();
    this.AssayForm.get('gender').reset();
    this.AssayForm.get('ageGroup').reset();
    this.AssayForm.get('targetVersion').reset();
    this.AssayForm.get('collectionId1').reset();
    this.AssayForm.get('original').reset();
    this.AssayForm.get('acronym').reset();
    this.AssayForm.get('organism').reset();
    this.AssayForm.get('variant').reset();
  }

  onBlurEvent(event: any) {
    if (event.target.value) {
      this.ligandManager.findOne(event.target.value).subscribe(response => {
        this.ligand001mb = deserialize<Ligand001wb>(Ligand001wb, response);
      });
    }
  }

  setEnable() {
    this.AssayForm.get('ligandSvalue').enable();
    this.AssayForm.get('unitSlno').enable();
    this.AssayForm.get('ligandHvalue').enable();
    this.AssayForm.get('ligandLvalue').enable();
    this.AssayForm.get('unitedSlno').enable();

    // this.AssayForm.get('ligandSvalue').Setvalue="";
    // this.AssayForm.get('unitSlno').Setvalue="";
    // this.AssayForm.get('ligandHvalue').Setvalue="";
    // this.AssayForm.get('ligandLvalue').Setvalue="";
    // this.AssayForm.get('unitedSlno').Setvalue="";
  }

  onsetEnable() {
    this.AssayForm.get('ligandSvalue').enable();
    this.AssayForm.get('unitSlno').enable();
    this.AssayForm.get('ligandHvalue').enable();
    this.AssayForm.get('ligandLvalue').enable();
    this.AssayForm.get('unitedSlno').enable();

    // this.AssayForm.get('ligandSvalue').Setvalue="";
    // this.AssayForm.get('unitSlno').Setvalue="";
    // this.AssayForm.get('ligandHvalue').Setvalue="";
    // this.AssayForm.get('ligandLvalue').Setvalue="";
    // this.AssayForm.get('unitedSlno').Setvalue="";
  }

  onSingleValueClick() {
    this.AssayForm.get('ligandHvalue').disable();
    this.AssayForm.get('ligandLvalue').disable();
    this.AssayForm.get('unitedSlno').disable();

  }

  highValueClick() {
    this.AssayForm.get('ligandSvalue').disable();
    this.AssayForm.get('unitSlno').disable();

  }

  setConditionEnable() {
    this.AssayForm.get('singleCondition').enable();
    this.AssayForm.get('singleUnit').enable();
    this.AssayForm.get('highCondition').enable();
    this.AssayForm.get('lowCondition').enable();
    this.AssayForm.get('highLowUnit').enable();
  }

  onsingleConditionClick() {
    this.AssayForm.get('highCondition').disable();
    this.AssayForm.get('lowCondition').disable();
    this.AssayForm.get('highLowUnit').disable();
  }

  highConditionClick() {
    this.AssayForm.get('singleCondition').disable();
    this.AssayForm.get('singleUnit').disable();
  }


  setMeasurementEnable() {
    this.AssayForm.get('singleValue').enable();
    this.AssayForm.get('unit').enable();
    this.AssayForm.get('highEndValue').enable();
    this.AssayForm.get('lowEndValue').enable();
    this.AssayForm.get('units').enable();
    this.AssayForm.get('nonNumeric').enable();
  }

  singleValClick() {
    this.AssayForm.get('highEndValue').disable();
    this.AssayForm.get('lowEndValue').disable();
    this.AssayForm.get('units').disable();
    this.AssayForm.get('nonNumeric').disable();
  }

  highandlowValueClick() {
    this.AssayForm.get('singleValue').disable();
    this.AssayForm.get('unit').disable();
    this.AssayForm.get('nonNumeric').disable();
  }

  nonNumericClick() {
    this.AssayForm.get('singleValue').disable();
    this.AssayForm.get('unit').disable();
    this.AssayForm.get('highEndValue').disable();
    this.AssayForm.get('lowEndValue').disable();
    this.AssayForm.get('units').disable();
  }


  onRepeat() {
    let i = this.assay.length - 1;
    for (i; i < this.assay.length; i++) {
      if (this.assay[i].status == "Submitted to QC") {
        this.calloutService.showWarning("This data can't be Edited");
      }

      if (this.assay[i].status != "Submitted to QC") {
        this.AssayForm.patchValue({
          // 'ordinal': this.assay[i].ordinal,
          'tanNo': this.assay[i].ligandSlno2?.tanNumber,
          'ligandSlno': this.assay[i].ligandSlno,
          'assayTypeSlno': this.assay[i].assayTypeSlno,
          'toxiCitySlno': this.assay[i].toxiCitySlno,
          'routeSlno': this.assay[i].routeSlno,
          'ligandSvalue': this.assay[i].ligandSvalue,
          'unitSlno': this.assay[i].unitSlno,
          'ligandHvalue': this.assay[i].ligandHvalue,
          'ligandLvalue': this.assay[i].ligandLvalue,
          'unitedSlno': this.assay[i].unitedSlno,
          'administration': this.assay[i].administration,
          'procedure': this.assay[i].procedure,
          'conditionType': this.assay[i].conditionType,
          'conditionMaterial': this.assay[i].conditionMaterial,
          'conditionMaterialid': this.assay[i].conditionMaterialid,
          'singleCondition': this.assay[i].singleCondition,
          'singleUnit': this.assay[i].singleUnit,
          'highCondition': this.assay[i].highCondition,
          'lowCondition': this.assay[i].lowCondition,
          'highLowUnit': this.assay[i].highLowUnit,

          // 'dataLocator': this.assay[i].dataLocator,
          'dataLocator1': this.assay[i].dataLocator1,
          'dataLocator2': this.assay[i].dataLocator2,
          'dataLocator3': this.assay[i].dataLocator3,
          'categorySlno': this.assay[i].categorySlno,
          'functionSlno': this.assay[i].functionSlno,
          'parameter': this.assay[i].parameter,
          'parameterDetail': this.assay[i].parameterDetail,
          'originalPrefixSlno': this.assay[i].originalPrefixSlno,
          'unit': this.assay[i].unit,
          'singleValue': this.assay[i].singleValue,
          'highEndValue': this.assay[i].highEndValue,
          'lowEndValue': this.assay[i].lowEndValue,
          'units': this.assay[i].units,
          'nonNumeric': this.assay[i].nonNumeric,
          'remark': this.assay[i].remark,
          'typeSlno': this.assay[i].typeSlno,
          'cell': this.assay[i].cell,
          'cellDetail': this.assay[i].cellDetail,
          'organ': this.assay[i].organ,
          'organDetail': this.assay[i].organDetail,
          'species': this.assay[i].species,
          'speciesDetail': this.assay[i].speciesDetail,
          'gender': this.assay[i].gender,
          'ageGroup': this.assay[i].ageGroup,


          'targetVersion': this.assay[i].targetVersion,
          'collectionId1': this.assay[i].collectionId1,
          'original': this.assay[i].original,
          'acronym': this.assay[i].acronym,
          'organism': this.assay[i].organism,
          'variant': this.assay[i].variant,

        });
      }
    }
  }

  onTargetReset() {
    // this.submitted = false;
    // this.AssayForm.f.original.clear();
    // this.AssayForm.f.targetVersion.reset();
    // this.AssayForm.f.collectionId1.reset();
    // this.AssayForm.f.acronym.reset();
    // this.AssayForm.f.organism.reset();
    // this.AssayForm.f.variant.reset();
    this.AssayForm.get('original').reset();
    this.AssayForm.get('targetVersion').reset();
    this.AssayForm.get('collectionId1').reset();
    this.AssayForm.get('acronym').reset();
    this.AssayForm.get('organism').reset();
    this.AssayForm.get('variant').reset();
  }

  onEdit() {
    let i = this.assay.length - 1;
    for (i; i < this.assay.length; i++) {
      if (this.assay[i].status == "Submitted to Qc") {
        this.calloutService.showWarning("This data can't be Edited");
      }
      if (this.assay[i].status != "Submitted to Qc") {
        this.assayId = this.assay[i].assayId;
        this.insertDatetime = new Date();
        this.insertUser = this.assay[i].insertUser;

        this.AssayForm.patchValue({
          'tanNo': this.assay[i].ligandSlno2?.tanNumber,
          'ordinal': this.assay[i].ordinal,
          'ligandSlno': this.assay[i].ligandSlno,
          'assayTypeSlno': this.assay[i].assayTypeSlno,
          'toxiCitySlno': this.assay[i].toxiCitySlno,
          'routeSlno': this.assay[i].routeSlno,
          'ligandSvalue': this.assay[i].ligandSvalue,
          'unitSlno': this.assay[i].unitSlno,
          'ligandHvalue': this.assay[i].ligandHvalue,
          'ligandLvalue': this.assay[i].ligandLvalue,
          'unitedSlno': this.assay[i].unitedSlno,
          'administration': this.assay[i].administration,
          'procedure': this.assay[i].procedure,
          'conditionType': this.assay[i].conditionType,
          'conditionMaterial': this.assay[i].conditionMaterial,
          'conditionMaterialid': this.assay[i].conditionMaterialid,
          'singleCondition': this.assay[i].singleCondition,
          'singleUnit': this.assay[i].singleUnit,
          'highCondition': this.assay[i].highCondition,
          'lowCondition': this.assay[i].lowCondition,
          'highLowUnit': this.assay[i].highLowUnit,

          'dataLocator1': this.assay[i].dataLocator1,
          'dataLocator2': this.assay[i].dataLocator2,
          'dataLocator3': this.assay[i].dataLocator3,
          'categorySlno': this.assay[i].categorySlno,
          'functionSlno': this.assay[i].functionSlno,
          'parameter': this.assay[i].parameter,
          'parameterDetail': this.assay[i].parameterDetail,
          'originalPrefixSlno': this.assay[i].originalPrefixSlno,
          'unit': this.assay[i].unit,
          'singleValue': this.assay[i].singleValue,
          'highEndValue': this.assay[i].highEndValue,
          'lowEndValue': this.assay[i].lowEndValue,
          'units': this.assay[i].units,
          'nonNumeric': this.assay[i].nonNumeric,
          'remark': this.assay[i].remark,
          'typeSlno': this.assay[i].typeSlno,
          'cell': this.assay[i].cell,
          'cellDetail': this.assay[i].cellDetail,
          'organ': this.assay[i].organ,
          'organDetail': this.assay[i].organDetail,
          'species': this.assay[i].species,
          'speciesDetail': this.assay[i].speciesDetail,
          'gender': this.assay[i].gender,
          'ageGroup': this.assay[i].ageGroup,


          'targetVersion': this.assay[i].targetVersion,
          'collectionId1': this.assay[i].collectionId1,
          'original': this.assay[i].original,
          'acronym': this.assay[i].acronym,
          'organism': this.assay[i].organism,
          'variant': this.assay[i].variant,


        });
      }


    }

  }

  OnToxicityType() {
    const modalRef = this.modalService.open(ToxicityTypePopupComponent, { size: 'medium' });
    modalRef.componentInstance.title = "TOXICITY TYPE";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.calloutService.showSuccess("Details Updated Successfully");


        var toxicitytypearray: any = []
        this.toxicityManager.alltoxicityType().subscribe(response => {
          this.toxiCities = deserialize<Toxicity001mb[]>(Toxicity001mb, response);
        });
        setTimeout(() => {
          for (let i = 0; i < this.toxiCities.length; i++) {
            toxicitytypearray.push(this.toxiCities[i].id)
          }
          this.max = toxicitytypearray.reduce(function (a: number, b: number) {
            return Math.max(a, b);
          });
          this.AssayForm.patchValue({
            toxiCitySlno: this.max,
          });

        }, 100);
      }
    }
    )
  }

  OnCategoryFuction() {
    const modalRef = this.modalService.open(CategoryFunctionPopupComponent, { size: 'medium' });
    modalRef.componentInstance.title = "CATEGORY ( FUNCTIONS )";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.calloutService.showSuccess("Details Updated Successfully");


        var categoryfunctionarray: any = []
        this.categoryfunctionManager.allcategoryFunction().subscribe(response => {
          this.categoryfunctions = deserialize<Toxicity001mb[]>(Toxicity001mb, response);
        });
        setTimeout(() => {
          for (let i = 0; i < this.categoryfunctions.length; i++) {
            categoryfunctionarray.push(this.categoryfunctions[i].id)
          }
          this.max = categoryfunctionarray.reduce(function (a: number, b: number) {
            return Math.max(a, b);
          });
          this.AssayForm.patchValue({
            functionSlno: this.max,
          });

        }, 100);
      }
    }
    )
  }

  OnOriginalPrefixFuction() {
    const modalRef = this.modalService.open(OriginalPrefixPopupComponent, { size: 'medium' });
    modalRef.componentInstance.title = "ORIGINAL - PREFIX";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.calloutService.showSuccess("Details Updated Successfully");


        var originalprefixarray: any = []
        this.originalprefixManager.alloriginalPrefix().subscribe(response => {
          this.Originals = deserialize<Originalprefix001mb[]>(Originalprefix001mb, response);
        });
        setTimeout(() => {
          for (let i = 0; i < this.Originals.length; i++) {
            originalprefixarray.push(this.Originals[i].id)
          }
          this.max = originalprefixarray.reduce(function (a: number, b: number) {
            return Math.max(a, b);
          });
          this.AssayForm.patchValue({
            originalPrefixSlno: this.max,
          });

        }, 100);
      }
    }
    )
  }

  onDoseSingleUnit() {
    const modalRef = this.modalService.open(LigandDoseSingleunitPopupComponent, { size: 'medium' });
    modalRef.componentInstance.title = "LIGAND DOSE ( SINGLE UNIT )";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.calloutService.showSuccess("Details Updated Successfully");


        var dosesingleunitarray: any = []
        this.unitSingleValueManager.allunitSingleValue().subscribe(response => {
          this.unitsinglevalues = deserialize<Unitsinglevalue001mb[]>(Unitsinglevalue001mb, response);
        });
        setTimeout(() => {
          for (let i = 0; i < this.unitsinglevalues.length; i++) {
            dosesingleunitarray.push(this.unitsinglevalues[i].id)
          }
          this.max = dosesingleunitarray.reduce(function (a: number, b: number) {
            return Math.max(a, b);
          });
          this.AssayForm.patchValue({
            unitSlno: this.max,
          });

        }, 100);
      }
    }
    )
  }


  OnDoseHighLowUnit() {
    const modalRef = this.modalService.open(LigandDoseHighlowunitPopupComponent, { size: 'medium' });
    modalRef.componentInstance.title = "LIGAND DOSE  ( HIGH & LOW UNIT )";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.calloutService.showSuccess("Details Updated Successfully");


        var dosehighlowunitarray: any = []
        this.unitlowendvalueManager.allunitlowendvalue().subscribe(response => {
          this.unitlowendvalues = deserialize<Unitlowendvalue001mb[]>(Unitlowendvalue001mb, response);
        });
        setTimeout(() => {
          for (let i = 0; i < this.unitlowendvalues.length; i++) {
            dosehighlowunitarray.push(this.unitlowendvalues[i].id)
          }
          this.max = dosehighlowunitarray.reduce(function (a: number, b: number) {
            return Math.max(a, b);
          });
          this.AssayForm.patchValue({
            unitedSlno: this.max,
          });

        }, 100);
      }
    }
    )
  }

  onConsitionSingleUnit() {
    const modalRef = this.modalService.open(LigandDoseSingleunitPopupComponent, { size: 'medium' });
    modalRef.componentInstance.title = "CONDITION  ( SINGLE UNIT )";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.calloutService.showSuccess("Details Updated Successfully");


        var dosesingleunitarray: any = []
        this.unitSingleValueManager.allunitSingleValue().subscribe(response => {
          this.unitsinglevalues = deserialize<Unitsinglevalue001mb[]>(Unitsinglevalue001mb, response);
        });
        setTimeout(() => {
          for (let i = 0; i < this.unitsinglevalues.length; i++) {
            dosesingleunitarray.push(this.unitsinglevalues[i].id)
          }
          this.max = dosesingleunitarray.reduce(function (a: number, b: number) {
            return Math.max(a, b);
          });
          this.AssayForm.patchValue({
            singleUnit: this.max,
          });

        }, 100);
      }
    }
    )
  }


  OnConditionHighLowUnit() {
    const modalRef = this.modalService.open(LigandDoseHighlowunitPopupComponent, { size: 'medium' });
    modalRef.componentInstance.title = "CONDITION  ( HIGH & LOW UNIT )";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.calloutService.showSuccess("Details Updated Successfully");


        var dosehighlowunitarray: any = []
        this.unitlowendvalueManager.allunitlowendvalue().subscribe(response => {
          this.unitlowendvalues = deserialize<Unitlowendvalue001mb[]>(Unitlowendvalue001mb, response);
        });
        setTimeout(() => {
          for (let i = 0; i < this.unitlowendvalues.length; i++) {
            dosehighlowunitarray.push(this.unitlowendvalues[i].id)
          }
          this.max = dosehighlowunitarray.reduce(function (a: number, b: number) {
            return Math.max(a, b);
          });
          this.AssayForm.patchValue({
            highLowUnit: this.max,
          });

        }, 100);
      }
    }
    )
  }

  onMeasurementSingleUnit() {
    const modalRef = this.modalService.open(LigandDoseSingleunitPopupComponent, { size: 'medium' });
    modalRef.componentInstance.title = "MEASUREMENT  ( SINGLE UNIT )";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.calloutService.showSuccess("Details Updated Successfully");


        var dosesingleunitarray: any = []
        this.unitSingleValueManager.allunitSingleValue().subscribe(response => {
          this.unitsinglevalues = deserialize<Unitsinglevalue001mb[]>(Unitsinglevalue001mb, response);
        });
        setTimeout(() => {
          for (let i = 0; i < this.unitsinglevalues.length; i++) {
            dosesingleunitarray.push(this.unitsinglevalues[i].id)
          }
          this.max = dosesingleunitarray.reduce(function (a: number, b: number) {
            return Math.max(a, b);
          });
          this.AssayForm.patchValue({
            unit: this.max,
          });

        }, 100);
      }
    }
    )
  }


  onMeasurementHighLowUnit() {
    const modalRef = this.modalService.open(LigandDoseHighlowunitPopupComponent, { size: 'medium' });
    modalRef.componentInstance.title = "MEASUREMENT  ( HIGH & LOW UNIT )";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.calloutService.showSuccess("Details Updated Successfully");


        var dosehighlowunitarray: any = []
        this.unitlowendvalueManager.allunitlowendvalue().subscribe(response => {
          this.unitlowendvalues = deserialize<Unitlowendvalue001mb[]>(Unitlowendvalue001mb, response);
        });
        setTimeout(() => {
          for (let i = 0; i < this.unitlowendvalues.length; i++) {
            dosehighlowunitarray.push(this.unitlowendvalues[i].id)
          }
          this.max = dosehighlowunitarray.reduce(function (a: number, b: number) {
            return Math.max(a, b);
          });
          this.AssayForm.patchValue({
            units: this.max,
          });

        }, 100);
      }
    }
    )
  }

}
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { LigandComponent } from 'src/app/dash-board/ligand/ligand.component';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AssayManager } from '../services/restcontroller/bizservice/Assay.service';
import { AssayTypeManager } from '../services/restcontroller/bizservice/assayType.service';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { CategoryManager } from '../services/restcontroller/bizservice/category.service';
import { CategoryfunctionManager } from '../services/restcontroller/bizservice/categoryFunction.service';
import { LigandManager } from '../services/restcontroller/bizservice/ligandManager.service';
import { LigandTypeManager } from '../services/restcontroller/bizservice/ligandType.service';
import { LigandVersionManager } from '../services/restcontroller/bizservice/ligandVersion.service';
import { MeasurementManager } from '../services/restcontroller/bizservice/Measurement.service';
import { OriginalprefixManager } from '../services/restcontroller/bizservice/originalPrefix.service';
import { RouteofAdminManager } from '../services/restcontroller/bizservice/routeOfAdministration.service';
import { ToxicityManager } from '../services/restcontroller/bizservice/toxiCity.service';
import { BioTypeManager } from '../services/restcontroller/bizservice/type.service';
import { UnitlowendvalueManager } from '../services/restcontroller/bizservice/Unitlowendvalue.service';
import { UnitSingleValueManager } from '../services/restcontroller/bizservice/unitSingleValue.service';
import { Assay001wb } from '../services/restcontroller/entities/Assay001wb ';
import { Assaytype001mb } from '../services/restcontroller/entities/Assaytype001mb';
import { Category001mb } from '../services/restcontroller/entities/Category001mb';
import { Categoryfunction001mb } from '../services/restcontroller/entities/Categoryfunction001mb';
import { Ligand001wb } from '../services/restcontroller/entities/Ligand001wb';
import { Ligandtype001mb } from '../services/restcontroller/entities/Ligandtype001mb';
import { Ligandversion001mb } from '../services/restcontroller/entities/Ligandversion001mb';
import { Measurement001wb } from '../services/restcontroller/entities/Measurement001wb';
import { Originalprefix001mb } from '../services/restcontroller/entities/Originalprefix001mb';
import { Routeofadministration001mb } from '../services/restcontroller/entities/Routeofadministration001mb';
import { Toxicity001mb } from '../services/restcontroller/entities/Toxicity001mb';
import { Type001mb } from '../services/restcontroller/entities/Type001mb';
import { Unitlowendvalue001mb } from '../services/restcontroller/entities/Unitlowendvalue001mb';
import { Unitsinglevalue001mb } from '../services/restcontroller/entities/Unitsinglevalue001mb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';
import { Utils } from '../utils/utils';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-checked',
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.css']
})
export class CheckedComponent implements OnInit {
  public CheckedForm: FormGroup | any;
  public LigandForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;
  isEditable: boolean = false;
  
  @Input() data: number | any;

  ligandId: number | any;
  tanNumber: number | any;
  ligandUri: number | any;
  ligandVersionSlno: string = "";
  ligandStatus: string = "";
  ligandTypeSlno: string = "";
  identifier1: string = "";
  identifier2: string = "";
  identifier3: string = "";
  collection: string = "";
  collectionId: number | any;
  ligandDetail: string = "";
  locator: string = "";
  sourceType: string = "";
  citation: string = "";
  relatedDocument: string = "";
  registryNumber: string = "";
  diseaseName1: string = "";
  diseaseName2: string = "";
  diseaseName3: string = "";
  ligandVersions: number | any;
  target: number | any;
  targetVersion: number | any;
  targetStatus: string = "";
  collectionId1: number | any;
  original: number | any;
  acronym: number | any;
  organism: number | any;
  variant: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  assayId: number | any;
  ligandSlno: number | any;
  ordinal: string = "";
  // collectionId: string = "";
  assayTypeSlno: number | any;
  toxiCitySlno: number | any;
  routeSlno: number | any;
  ligandSvalue: string = "";
  unitSlno: number | any;
  ligandHvalue: string = "";
  ligandLvalue: string = "";
  unitedSlno: number | any;
  administration: string = "";
  procedure: string = "";
  // target: string = "";
  conditionType: string = "";
  conditionMaterial: string = "";
  conditionMaterialid: string = "";
  singleCondition: string = "";
  singleUnit: string = "";
  highCondition: string = "";
  lowCondition: string = "";
  highLowUnit: string = "";


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


  username: any;
  ligand001mb?: Ligand001wb;

  ligand: Ligand001wb[] = [];
  ligandVersions1: Ligandversion001mb[] = [];
  ligandtypes: Ligandtype001mb[] = [];

  assayTypes: Assaytype001mb[] = [];
  toxiCities: Toxicity001mb[] = [];
  routeAdmins: Routeofadministration001mb[] = [];
  unitsinglevalues: Unitsinglevalue001mb[] = [];
  unitlowendvalues: Unitlowendvalue001mb[] = [];

  assays: Assay001wb[] = [];
  categorys: Category001mb[] = [];
  categoryfunctions: Categoryfunction001mb[] = [];
  Originals: Originalprefix001mb[] = [];
  types: Type001mb[] = [];

  @Output() open: EventEmitter<boolean> = new EventEmitter();
  SearchMenuValues: string = '';
  SearchMenuItems: string = '';
  isActive: boolean | undefined;
  activeTab: boolean = false;
  searchStr: any;
  modalRef: any;
  parentMenuString: string = "";
  childMenuString: string = "";



  hexToRgb: any;
  rgbToHex: any;
  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;
  title: string | undefined;
  params: any
  static CheckedForm: any;
  


  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private ligandManager: LigandManager,
    private ligandVersionManager: LigandVersionManager,
    private ligandTypeManager: LigandTypeManager,
    private assayManager: AssayManager,
    private measurementManager: MeasurementManager,
    private assayTypeManager: AssayTypeManager,
    private toxicityManager: ToxicityManager,
    private routeofAdminManager: RouteofAdminManager,
    private unitSingleValueManager: UnitSingleValueManager,
    private unitlowendvalueManager: UnitlowendvalueManager,
    private categoryManager: CategoryManager,
    private categoryfunctionManager: CategoryfunctionManager,
    private originalprefixManager: OriginalprefixManager,
    private bioTypeManager: BioTypeManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    

    this.CheckedForm = this.formBuilder.group({

      tanNumber: [this.data.ligandSlno2.tanNumber],
      // ligandUri: [this.data.ligandUri],
      ligandVersionSlno: [this.data.ligandSlno2.ligandVersionSlno],
      ligandTypeSlno: [this.data.ligandSlno2.ligandTypeSlno],
      ligandDetail: [this.data.ligandSlno2.ligandDetail],
      identifier1: [this.data.ligandSlno2.identifier1],
      identifier2: [this.data.ligandSlno2.identifier2],
      identifier3: [this.data.ligandSlno2.identifier3],
      collectionId: [this.data.ligandSlno2.collectionId],
      locator: [this.data.ligandSlno2.locator],
      // citation: [this.data.tanNumber],
      // relatedDocument: [this.data.tanNumber],
      // registryNumber: [this.data.collectionId],
      diseaseName1: [this.data.ligandSlno2.diseaseName1],
      diseaseName2: [this.data.ligandSlno2.diseaseName2],
      diseaseName3: [this.data.ligandSlno2.diseaseName3],
      
      // -----------Assay-----------

      ligandSlno: [this.data.ligandSlno2.ligandVersionSlno],
      ordinal: [this.data.ordinal],
      assayTypeSlno: [this.data.assayTypeSlno2.assayType],
      toxiCitySlno: [this.data.toxiCitySlno2.toxiCity],
      routeSlno: [this.data.routeSlno2.route],
      ligandSvalue: [this.data.ligandSvalue],
      unitSlno: [this.data.unitSlno2.unit],
      ligandHvalue: [this.data.ligandHvalue],
      ligandLvalue: [this.data.ligandLvalue],
      unitedSlno: [this.data.unitedSlno.united],
      administration: [this.data.administration],
      procedure: [this.data.procedure],
      conditionType: [this.data.conditionType],
      conditionMaterial: [this.data.conditionMaterial],
      conditionMaterialid: [this.data.conditionMaterialid],
      singleCondition: [this.data.singleCondition],
      singleUnit: [this.data.singleUnit],
      highCondition: [this.data.highCondition],
      lowCondition: [this.data.lowCondition],
      highLowUnit: [this.data.highLowUnit],



      dataLocator: [this.data.dataLocator],
      assaySlno: [this.ligandSlno],
      categorySlno: [this.data.categorySlno2.category],
      functionSlno: [this.data.functionSlno2.function],
      parameter: [this.data.parameter],
      parameterDetail: [this.data.parameterDetail],
      originalPrefixSlno: [this.data.originalPrefixSlno2.originalPrefix],
      unit: [this.data.unitSlno2.unit],
      singleValue: [this.data.singleValue],
      highEndValue: [this.data.highEndValue],
      lowEndValue: [this.data.lowEndValue],
      units: [this.data.unitedSlno.united],
      nonNumeric: [this.data.nonNumeric],
      remark: [this.data.remark],
      typeSlno: [this.data.typeSlno2.type],
      cell: [this.data.cell],
      cellDetail: [this.data.cellDetail],
      organ: [this.data.organ],
      organDetail: [this.data.organDetail],
      species: [this.data.species],
      speciesDetail: [this.data.speciesDetail],
      gender: [this.data.gender],
      ageGroup: [this.data.ageGroup],

      ligandVersions: [this.data.ligandSlno2.ligandVersionSlno2.ligandVersion],
      targetVersion: [this.data.targetVersion],
      collectionId1: [this.data.collectionId1],
      original: [this.data.original],
      acronym: [this.data.acronym],
      organism: [this.data.organism],
      variant: [this.data.variant],

    });


    this.dataSharedService.currentMenuObject.subscribe((object: any) => {
      this.parentMenuString = object.parentMenuString;
      this.childMenuString = object.childMenuString;
    });

    this.username = this.authManager.getcurrentUser.username;
    this.ligandManager.allligand(this.username).subscribe(response => {
      this.ligand = deserialize<Ligand001wb[]>(Ligand001wb, response);
    });

    this.ligandVersionManager.allligandVersion().subscribe(response => {
      this.ligandVersions1 = deserialize<Ligandversion001mb[]>(Ligandversion001mb, response);
      //   for(let ligVersions of this.ligandVersions1) {
      //   }
    });

    this.ligandTypeManager.allligandType().subscribe(response => {
      this.ligandtypes = deserialize<Ligandtype001mb[]>(Ligandtype001mb, response);
    });


    // ----------------------------Assay-------------------------
    // this.ligandManager.allligand(this.username).subscribe(response => {
    //       this.ligands = deserialize<Ligand001wb[]>(Ligand001wb, response);
    //     });

    this.assayTypeManager.allassayType().subscribe(response => {
      this.assayTypes = deserialize<Assaytype001mb[]>(Assaytype001mb, response);
    });

    this.toxicityManager.alltoxicityType().subscribe(response => {
      this.toxiCities = deserialize<Toxicity001mb[]>(Toxicity001mb, response);
    });

    this.routeofAdminManager.allrouteofadminType().subscribe(response => {
      this.routeAdmins = deserialize<Routeofadministration001mb[]>(Routeofadministration001mb, response);
    });

    this.unitSingleValueManager.allunitSingleValue().subscribe(response => {
      this.unitsinglevalues = deserialize<Unitsinglevalue001mb[]>(Unitsinglevalue001mb, response);
    });

    this.unitlowendvalueManager.allunitlowendvalue().subscribe(response => {
      this.unitlowendvalues = deserialize<Unitlowendvalue001mb[]>(Unitlowendvalue001mb, response);
    });
    // -----------------------Assay end------------------------
    // this.assayManager.allassay(this.username).subscribe(response => {
    //   this.assays = deserialize<Assay001wb[]>(Assay001wb, response);
    // });

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


    this.authManager.currentUserSubject.subscribe((object: any) => {

      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });
    this.title = this.title + 'SearchMenu';



  }

  get f() { return this.CheckedForm.controls; }



 

  onCancelClick() {
    this.activeModal.close('No');
  }


  onReviewerClick(event: any, CheckedForm: any) {

    let ligand001wb = new Ligand001wb();

    ligand001wb.tanNumber = this.f.tanNumber.value ? this.f.tanNumber.value : "";
    ligand001wb.ligandUri = "bioactivity-ligand" + "/" + "SaturoGlobal" + "/" + this.f.tanNumber.value + "/" + this.f.ligandVersionSlno.value + ">" + "bioactivity-ligand" + "/" + uuid();
    ligand001wb.ligandVersionSlno = this.f.ligandVersionSlno.value ? this.f.ligandVersionSlno.value : null;
    ligand001wb.ligandStatus = "embargoed";
    ligand001wb.collection = "cas";
    ligand001wb.ligandTypeSlno = this.f.ligandTypeSlno.value ? this.f.ligandTypeSlno.value : null;
    ligand001wb.ligandDetail = this.f.ligandDetail.value ? this.f.ligandDetail.value : "";
    ligand001wb.identifier1 = this.f.identifier1.value ? this.f.identifier1.value : "";
    ligand001wb.identifier2 = this.f.identifier2.value ? this.f.identifier2.value : "";
    ligand001wb.identifier3 = this.f.identifier3.value ? this.f.identifier3.value : "";
    ligand001wb.collectionId = this.f.locator.value ? this.f.collectionId.value : "";
    ligand001wb.locator = this.f.locator.value ? this.f.locator.value : "";
    ligand001wb.sourceType = "journal";
    ligand001wb.citation = this.f.tanNumber.value ? this.f.tanNumber.value : "";
    ligand001wb.relatedDocument = this.f.tanNumber.value ? this.f.tanNumber.value : "";
    ligand001wb.registryNumber = this.f.collectionId.value ? this.f.collectionId.value : "";
    ligand001wb.diseaseName1 = this.f.diseaseName1.value ? this.f.diseaseName1.value : "";
    ligand001wb.diseaseName2 = this.f.diseaseName2.value ? this.f.diseaseName2.value : "";
    ligand001wb.diseaseName3 = this.f.diseaseName3.value ? this.f.diseaseName3.value : "";
    // ligand001wb.target = "bioactivity-target" + "/" + "SaturoGlobal" + "/" + this.f.tanNumber.value + "/" + this.f.ligandVersionSlno.value + ">" + "bioactivity-target" + "/" + uuid();
    ligand001wb.target = "";
    ligand001wb.targetStatus = "";
    ligand001wb.targetVersion = "";
    ligand001wb.collectionId1 = "";
    ligand001wb.original = "";
    ligand001wb.acronym = "";
    ligand001wb.organism = "";
    ligand001wb.variant = "";
    ligand001wb.status =  "";


    ligand001wb.ligandId = this.ligandId;
    ligand001wb.insertUser = this.insertUser;
    ligand001wb.insertDatetime = this.insertDatetime;
    ligand001wb.updatedUser = this.authManager.getcurrentUser.username;
    ligand001wb.updatedDatetime = new Date();
    this.ligandManager.ligandupdate(ligand001wb).subscribe((response) => {
      this.calloutService.showSuccess("Ligand Details Updated Successfully");
      // this.loadData();
      this.CheckedForm.reset();
      this.ligandId = null;
      this.submitted = false;
    });


    let assay001wb = new Assay001wb();
    assay001wb.ordinal = this.f.ordinal.value ? this.f.ordinal.value : "";
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
    assay001wb.target = "bioactivity-target" + "/" + "SaturoGlobal" + "/" + this.ligand001mb?.tanNumber + "/" + this.ligand001mb?.ligandVersionSlno2?.ligandVersion + "/" + this.f.targetVersion.value +  ">" + "bioactivity-target" + "/" + uuid();
    assay001wb.conditionType = this.f.conditionType.value ? this.f.conditionType.value : "";
    assay001wb.conditionMaterial = this.f.conditionMaterial.value ? this.f.conditionMaterial.value : "";
    assay001wb.conditionMaterialid = this.f.conditionMaterialid.value ? this.f.conditionMaterialid.value : "";
    assay001wb.singleCondition = this.f.singleCondition.value ? this.f.singleCondition.value : "";
    assay001wb.singleUnit = this.f.singleUnit.value ? this.f.singleUnit.value : "";
    assay001wb.highCondition = this.f.highCondition.value ? this.f.highCondition.value : "";
    assay001wb.lowCondition = this.f.lowCondition.value ? this.f.lowCondition.value : "";
    assay001wb.highLowUnit = this.f.highLowUnit.value ? this.f.highLowUnit.value : "";
    assay001wb.status = "SUBMITTED TO QC";
    assay001wb.targetStatus="embargoed";
   
    assay001wb.dataLocator = this.f.dataLocator.value ? this.f.dataLocator.value : "";
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

    
      assay001wb.assayId = this.assayId;
      assay001wb.insertUser = this.insertUser;
      assay001wb.insertDatetime = this.insertDatetime;
      assay001wb.updatedUser = this.authManager.getcurrentUser.username;
      assay001wb.updatedDatetime = new Date();
      this.assayManager.assayupdate(assay001wb).subscribe((response) => {
        this.calloutService.showSuccess("Assay Details Updated Successfully");
        // this.loadData();
        this.CheckedForm.reset();
        this.assayId = null;
        this.submitted = false;
      });
  
    


    

  }

  onEditReviewerClick(event: any) {
    this.isEditable = !this.isEditable;
  }

}

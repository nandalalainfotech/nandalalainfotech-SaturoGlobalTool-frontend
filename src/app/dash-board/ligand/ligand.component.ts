import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { forkJoin, Observable } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { Role } from 'src/app/role';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { LigandTypeManager } from 'src/app/shared/services/restcontroller/bizservice/ligandType.service';
import { LigandVersionManager } from 'src/app/shared/services/restcontroller/bizservice/ligandVersion.service';
import { TaskAllocationManager } from 'src/app/shared/services/restcontroller/bizservice/taskAllocation.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
import { Ligand001wb } from 'src/app/shared/services/restcontroller/entities/Ligand001wb';
import { Ligandtype001mb } from 'src/app/shared/services/restcontroller/entities/Ligandtype001mb';
import { Ligandversion001mb } from 'src/app/shared/services/restcontroller/entities/Ligandversion001mb';
import { Role001mb } from 'src/app/shared/services/restcontroller/entities/Role001mb';
import { Taskallocation001wb } from 'src/app/shared/services/restcontroller/entities/Taskallocation001wb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-ligand',
  templateUrl: './ligand.component.html',
  styleUrls: ['./ligand.component.css']
})
export class LigandComponent implements OnInit {

  public LigandForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;


  ligandId: number | any;
  assayId?: any;
  tanNumber?: string | any;
  ligandUri: number | any;
  ligandVersionSlno: number | any;
  ligandStatus: string | any;
  ligandTypeSlno: string | any;
  identifier1: string | any;
  identifier2: string | any;
  identifier3: string | any;
  collection: string | any;
  collectionId: string | any;
  ligandDetail: string | any;
  locator: string | any;
  sourceType: string | any;
  citation: string | any;
  relatedDocument: string | any;
  registryNumber: string | any;
  diseaseName1: string | any;
  diseaseName2: string | any;
  diseaseName3: string | any;
  target: number | any;
  targetVersion: number | any;
  targetStatus: string | any;
  collectionId1: number | any;
  original: number | any;
  acronym: number | any;
  organism: number | any;
  variant: number | any;
  insertUser?: string | any;
  insertDatetime: Date | any;
  updatedUser: string | any;
  updatedDatetime: Date | any;
  ligands: Ligand001wb[] = [];
  ligandVersions: Ligandversion001mb[] = [];
  ligandtypes: Ligandtype001mb[] = [];
  tanNos: Taskallocation001wb[] = [];
  ligandVersion001?: Ligandversion001mb;
  // assay001wbs: Assay001wb[] = [];
  hexToRgb: any;
  rgbToHex: any;

  ligand001mb?: Ligand001wb;
  assay001wbs?: Assay001wb;

  user001mb?: User001mb;
  roles: Role001mb[] = [];

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  public sub: any;
  public inprocess: any;

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;
  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private ligandManager: LigandManager,
    private ligandVersionManager: LigandVersionManager,
    private ligandTypeManager: LigandTypeManager,
    private taskAllocationManager: TaskAllocationManager,
    private route: ActivatedRoute,
    private assayManager: AssayManager,
  ) {

    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: { [x: string]: any; }) => {
      this.ligandId = params["ligandId"];
      this.insertUser = params["insertUser"];
      this.tanNumber = params["tanNumber"];

      // if ( this.ligandId) {
      //   this.ligandManager.findAllByLigandId(this.ligandId).subscribe(response => {
      //     let ligand = deserialize<Ligand001wb>(Ligand001wb, response);

      //     let LigandId = ligand.ligandId;
      //     this.ligandId = LigandId;

      //     let InsertUser = ligand.insertUser;
      //     this.insertUser = InsertUser;


      //     let TanNumber = ligand.tanNumber;
      //     this.tanNumber = TanNumber;

      //     let LigandVersion = ligand.ligandVersionSlno;
      //     this.ligandVersionSlno = LigandVersion;

      //     let LigandType = ligand.ligandTypeSlno;
      //     this.ligandTypeSlno = LigandType;

      //     let Identifier1 = ligand.identifier1;
      //     this.identifier1 = Identifier1;

      //     let Identifier2 = ligand.identifier2;
      //     this.identifier2 = Identifier2;

      //     let Identifier3 = ligand.identifier3;
      //     this.identifier3 = Identifier3;

      //     let CollectionId = ligand.collectionId;
      //     this.collectionId = CollectionId;

      //     let Locator = ligand.locator;
      //     this.locator = Locator;

      //     let LigandDetail = ligand.ligandDetail;
      //     this.ligandDetail = LigandDetail;

      //     let DiseaseName1 = ligand.diseaseName1;
      //     this.diseaseName1 = DiseaseName1;

      //     let DiseaseName2 = ligand.diseaseName2;
      //     this.diseaseName2 = DiseaseName2;

      //     let DiseaseName3 = ligand.diseaseName3;
      //     this.diseaseName3 = DiseaseName3;

      //   });
      // }
      // else {
      //    this.ligandId = params["ligandId"];
      //    console.log("this.ligandId---->>>",this.ligandId);
      //   this.tanNumber = params["tanNumber"];
      //   console.log("this.tanNumber---->>>",this.tanNumber);
      //   this.insertUser = params["insertUser"];
      //   console.log("this.insertUser---->>>",this.insertUser);

      //  }

    });


    this.LigandForm = this.formBuilder.group({
      tanNumber: ['', Validators.required],
      ligandVersionSlno: [''],
      ligandId: [''],
      ligandTypeSlno: [''],
      identifier1: [''],
      identifier2: [''],
      identifier3: [''],
      collectionId: [''],
      ligandDetail: [''],
      locator: [''],
      diseaseName1: [''],
      diseaseName2: [''],
      diseaseName3: [''],
      // target: [''],
      targetVersion: [''],
      collectionId1: [''],
      original: [''],
      acronym: [''],
      organism: [''],
      variant: [''],
    });

    this.createDataGrid001();

    this.username = this.authManager.getcurrentUser.username;

    // this.ligandVersionManager.allligandVersion().subscribe(response => {
    //   this.ligandVersions = deserialize<Ligandversion001mb[]>(Ligandversion001mb, response);

    // });

    // this.ligandTypeManager.allligandType().subscribe(response => {
    //   this.ligandtypes = deserialize<Ligandtype001mb[]>(Ligandtype001mb, response);
    // });

    // this.taskAllocationManager.findByTanNo(this.username).subscribe(response => {
    //   this.tanNos = deserialize<Taskallocation001wb[]>(Taskallocation001wb, response);

    // });

    let res1 = this.ligandVersionManager.allligandVersion();
    let res2 = this.ligandTypeManager.allligandType();
    let res3 = this.taskAllocationManager.findByTanNo(this.username);

    forkJoin([res1, res2, res3]).subscribe(data => {

      this.ligandVersions = deserialize<Ligandversion001mb[]>(Ligandversion001mb, data[0]);
      this.ligandtypes = deserialize<Ligandtype001mb[]>(Ligandtype001mb, data[1]);
      this.tanNos = deserialize<Taskallocation001wb[]>(Taskallocation001wb, data[2]);
      this.loadData();
      setTimeout(() => {
        this.LigandForm.patchValue({
          tanNumber: this.tanNumber,
          insertUser: this.insertUser,
          // ligandId: this.ligandId,
          // ligandTypeSlno: this.ligandTypeSlno,
          // identifier1: this.identifier1,
          // identifier2: this.identifier2,
          // identifier3: this.identifier3,
          // collectionId: this.collectionId,
          // ligandDetail: this.ligandDetail,
          // locator: this.locator,
          // diseaseName1: this.diseaseName1,
          // diseaseName2: this.diseaseName2,
          // diseaseName3: this.diseaseName3,

        }, 10);
        this.loadData();
      });

    });

    

    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);
      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });


  }

  username = this.authManager.getcurrentUser.username;

  loadData() {
    this.ligandManager.allligand(this.username).subscribe(response => {
      this.ligands = deserialize<Ligand001wb[]>(Ligand001wb, response);
      let oneTan: Ligandversion001mb[] = [];
      for(let i=0; i<this.ligands.length; i++){
        if(this.ligands[i].tanNumber==this.tanNumber){
          oneTan.push(this.ligands[i])
        }
      }
    // console.log("oneTan", oneTan)
    setTimeout(() => {
      if (this.ligands) {
        this.gridOptions?.api?.setRowData(oneTan);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    }, 100);
    });


  }


  get f() { return this.LigandForm.controls; }

  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 100,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      // {
      //   headerName: 'Sl-No',
      //   field: 'ligandId',
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
        cellStyle: { textAlign: 'left' },
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
        cellStyle: { textAlign: 'left' },
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },
      {
        headerName: 'TAN Number',
        field: 'tanNumber',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
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
        valueGetter: this.setLigandVersion.bind(this)
      },
      {
        headerName: 'Ligand-status',
        field: 'ligandStatus',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Collection',
        field: 'collection',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Ligand-Type',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setType.bind(this)

      },
      {
        headerName: 'Identifier1',
        field: 'identifier1',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Identifier2',
        field: 'identifier2',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Identifier3',
        field: 'identifier3',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },



      {
        headerName: 'Collection-id',
        field: 'collectionId',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Ligand-detail',
        field: 'ligandDetail',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Locator',
        field: 'locator',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      {
        headerName: 'Original-disease-name1',
        field: 'diseaseName1',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Original-disease-name2',
        field: 'diseaseName2',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Original-disease-name3',
        field: 'diseaseName3',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },

      // {
      //   headerName: 'Ligand Version',
      //   width: 200,
      //   // flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true,
      //   valueGetter: this.setLigandVersion.bind(this)
      // },

      // {
      //   headerName: 'Target-Version',
      //   field: 'targetVersion',
      //   width: 200,
      //   // flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true,
      // },
      // {
      //   headerName: 'Target-Status',
      //   field: 'targetStatus',
      //   width: 200,
      //   // flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true,
      // },
      // {
      //   headerName: 'Collection-ID',
      //   field: 'collectionId1',
      //   width: 200,
      //   // flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true,
      // },
      // {
      //   headerName: 'Target-Name',
      //   field: 'original',
      //   width: 200,
      //   // flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true,

      // },
      // {
      //   headerName: 'Acronym',
      //   field: 'acronym',
      //   width: 200,
      //   // flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true,
      // },
      // {
      //   headerName: 'Organism-Source',
      //   field: 'organism',
      //   width: 200,
      //   // flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true,
      // },
      // {
      //   headerName: 'Variant',
      //   field: 'variant',
      //   width: 200,
      //   // flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true,
      // },
      {
        headerName: 'Audit',
        cellRenderer: 'iconRenderer',
        width: 80,
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'left' },
        cellRendererParams: {
          onClick: this.onAuditButtonClick.bind(this),
          label: 'Audit'
        },
      },
    ];
  }

  setLigandVersion(params: any): string {
    return params.data.ligandVersionSlno2 ? params.data.ligandVersionSlno2.ligandVersion : null;
  }

  setType(params: any): string {
    return params.data.ligandTypeSlno2 ? params.data.ligandTypeSlno2.ligandtype : null;
  }


  onEditButtonClick(params: any) {

    // if (params.data.status != "Submitted to QC") {
    this.ligandId = params.data.ligandId;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.LigandForm.patchValue({

      'tanNumber': params.data.tanNumber,
      'ligandVersionSlno': params.data.ligandVersionSlno,
      'ligandTypeSlno': params.data.ligandTypeSlno,
      'ligandDetail': params.data.ligandDetail,
      'identifier1': params.data.identifier1,
      'identifier2': params.data.identifier2,
      'identifier3': params.data.identifier3,
      'collectionId': params.data.collectionId,
      'locator': params.data.locator,
      'diseaseName1': params.data.diseaseName1,
      'diseaseName2': params.data.diseaseName2,
      'diseaseName3': params.data.diseaseName3,
      // 'targetVersion': params.data.targetVersion,
      // 'collectionId1': params.data.collectionId1,
      // 'original': params.data.original,
      // 'acronym': params.data.acronym,
      // 'organism': params.data.organism,
      // 'variant': params.data.variant,
    });
    // }
  }

  onDeleteButtonClick(params: any) {
    if (params.data.status != "Submitted to QC") {
      const modalRef = this.modalService.open(ConformationComponent);
      modalRef.componentInstance.details = "Ligand";
      modalRef.componentInstance.description = "Are you sure want to delete Ligand ?";
      modalRef.result.then((data) => {
        if (data == "Yes") {
          this.ligandManager.liganddelete(params.data.ligandId).subscribe((response) => {
            for (let i = 0; i < this.ligands.length; i++) {
              if (this.ligands[i].ligandId == params.data.ligandId) {
                this.ligands?.splice(i, 1);
                break;
              }
            }
            const selectedRows = params.api.getSelectedRows();
            params.api.applyTransaction({ remove: selectedRows });
            this.gridOptions.api.deselectAll();
            this.calloutService.showSuccess("Ligand Removed Successfully");
          });
        }
      })
    }
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Ligand";
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

  onBlurEvent(event: any) {
    if (event.target.value) {
      this.ligandVersionManager.findOne(event.target.value).subscribe(response => {
        this.ligandVersion001 = response;

      });
    }
  }

  onLigandClick(event: any, LigandForm: any) {

    this.markFormGroupTouched(this.LigandForm);

    this.submitted = true;
    if (this.LigandForm.invalid) {
      return;
    }
    let ligand001wb = new Ligand001wb();

    ligand001wb.tanNumber = this.f.tanNumber.value ? this.f.tanNumber.value : "";
    ligand001wb.ligandUri = "bioactivity-ligand" + "/" + "saturoglobal" + "/" + this.f.tanNumber.value + "/" + this.ligandVersion001?.ligandVersion + ">" + "bioactivity-ligand" + "/" + uuid();
    ligand001wb.ligandVersionSlno = this.f.ligandVersionSlno.value ? this.f.ligandVersionSlno.value : null;
    ligand001wb.ligandStatus = "embargoed";
    ligand001wb.collection = "cas";
    ligand001wb.ligandTypeSlno = this.f.ligandTypeSlno.value ? this.f.ligandTypeSlno.value : null;
    ligand001wb.ligandDetail = this.f.ligandDetail.value ? this.f.ligandDetail.value : "";
    ligand001wb.identifier1 = this.f.identifier1.value ? this.f.identifier1.value : "";
    ligand001wb.identifier2 = this.f.identifier2.value ? this.f.identifier2.value : "";
    ligand001wb.identifier3 = this.f.identifier3.value ? this.f.identifier3.value : "";
    ligand001wb.collectionId = this.f.collectionId.value ? this.f.collectionId.value : "";
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
    ligand001wb.status = "Before submit the data";

    if (this.ligandId) {
      ligand001wb.ligandId = this.ligandId;
      ligand001wb.insertUser = this.insertUser;
      ligand001wb.insertDatetime = this.insertDatetime;
      ligand001wb.updatedUser = this.authManager.getcurrentUser.username;
      ligand001wb.updatedDatetime = new Date();
      this.ligandManager.ligandupdate(ligand001wb).subscribe((response) => {

        this.calloutService.showSuccess("Ligand Details Updated Successfully");
        setTimeout(() => {
          this.loadData();
        }, 100);
        // this.LigandForm.reset();
        this.onReset();
        this.ligandId = null;
        this.submitted = false;


      });
    }
    else {
      ligand001wb.insertUser = this.authManager.getcurrentUser.username;
      ligand001wb.insertDatetime = new Date();

      this.ligandManager.ligandsave(ligand001wb).subscribe((response) => {
        this.calloutService.showSuccess("Ligand Details Saved Successfully");
        setTimeout(() => {
        this.loadData();
      }, 100);
        // this.ligandManager.allligand(this.username).subscribe(response => {
        //   this.ligands = deserialize<Ligand001wb[]>(Ligand001wb, response);
        //   let oneTan: Ligand001wb[] = [];
        //   for(let i=0; i<this.ligands.length; i++){
        //     if(this.ligands[i].tanNumber==this.tanNumber){
        //       oneTan.push(this.ligands[i])
        //     }
        //   }
        //   if (this.ligands.length > 0) {
        //     this.gridOptions?.api?.setRowData(oneTan);
        //   } else {
        //     this.gridOptions?.api?.setRowData([]);
        //   }
        // });

        this.onReset();
        this.submitted = false;
      });
    }
  }

  // toggleInprocess(event: any, LigandForm: any) {
  //   this.markFormGroupTouched(this.LigandForm);

  //   this.submitted = true;
  //   if (this.LigandForm.invalid) {
  //     return;
  //   }
  //   let ligand001wb = new Ligand001wb();

  //   ligand001wb.tanNumber = this.f.tanNumber.value ? this.f.tanNumber.value : "";
  //   ligand001wb.ligandUri = "bioactivity-ligand" + "/" + "saturoglobal" + "/" + this.f.tanNumber.value + "/" + this.ligandVersion001?.ligandVersion + ">" + "bioactivity-ligand" + "/" + uuid();
  //   ligand001wb.ligandVersionSlno = this.f.ligandVersionSlno.value ? this.f.ligandVersionSlno.value : null;
  //   ligand001wb.ligandStatus = "embargoed";
  //   ligand001wb.collection = "cas";
  //   ligand001wb.ligandTypeSlno = this.f.ligandTypeSlno.value ? this.f.ligandTypeSlno.value : null;
  //   ligand001wb.ligandDetail = this.f.ligandDetail.value ? this.f.ligandDetail.value : "";
  //   ligand001wb.identifier1 = this.f.identifier1.value ? this.f.identifier1.value : "";
  //   ligand001wb.identifier2 = this.f.identifier2.value ? this.f.identifier2.value : "";
  //   ligand001wb.identifier3 = this.f.identifier3.value ? this.f.identifier3.value : "";
  //   ligand001wb.collectionId = this.f.locator.value ? this.f.collectionId.value : "";
  //   ligand001wb.locator = this.f.locator.value ? this.f.locator.value : "";
  //   ligand001wb.sourceType = "journal";
  //   ligand001wb.citation = this.f.tanNumber.value ? this.f.tanNumber.value : "";
  //   ligand001wb.relatedDocument = this.f.tanNumber.value ? this.f.tanNumber.value : "";
  //   ligand001wb.registryNumber = this.f.collectionId.value ? this.f.collectionId.value : "";
  //   ligand001wb.diseaseName1 = this.f.diseaseName1.value ? this.f.diseaseName1.value : "";
  //   ligand001wb.diseaseName2 = this.f.diseaseName2.value ? this.f.diseaseName2.value : "";
  //   ligand001wb.diseaseName3 = this.f.diseaseName3.value ? this.f.diseaseName3.value : "";
  //   // ligand001wb.target = "bioactivity-target" + "/" + "SaturoGlobal" + "/" + this.f.tanNumber.value + "/" + this.f.ligandVersionSlno.value + ">" + "bioactivity-target" + "/" + uuid();
  //   ligand001wb.target = "";
  //   ligand001wb.targetStatus = "";
  //   ligand001wb.targetVersion = "";
  //   ligand001wb.collectionId1 = "";
  //   ligand001wb.original = "";
  //   ligand001wb.acronym = "";
  //   ligand001wb.organism = "";
  //   ligand001wb.variant = "";
  //   ligand001wb.status = "In Process";

  //   // if (this.ligandId) {
  //   //   ligand001wb.ligandId = this.ligandId;
  //   //   ligand001wb.insertUser = this.insertUser;
  //   //   ligand001wb.insertDatetime = this.insertDatetime;
  //   //   ligand001wb.updatedUser = this.authManager.getcurrentUser.username;
  //   //   ligand001wb.updatedDatetime = new Date();
  //   //   this.ligandManager.ligandupdate(ligand001wb).subscribe((response) => {
  //   //     this.calloutService.showSuccess("Ligand Details Updated Successfully");
  //   //     this.loadData();
  //   //     this.LigandForm.reset();
  //   //     this.ligandId = null;
  //   //     this.submitted = false;
  //   //   });
  //   // }
  //   // else {
  //   ligand001wb.insertUser = this.authManager.getcurrentUser.username;
  //   ligand001wb.insertDatetime = new Date();

  //   this.ligandManager.ligandsave(ligand001wb).subscribe((response) => {

  //     this.calloutService.showWarning("Ligand details are in process ");
  //     this.loadData();
  //     this.onReset();
  //     this.submitted = false;
  //   });
  //   // }

  // }



  onReset() {
    // this.submitted = false;
    // this.LigandForm.reset();
    this.LigandForm.get('ligandVersionSlno').reset();
    this.LigandForm.get('ligandTypeSlno').reset();
    this.LigandForm.get('ligandDetail').reset();
    this.LigandForm.get('identifier1').reset();
    this.LigandForm.get('identifier2').reset();
    this.LigandForm.get('identifier3').reset();
    this.LigandForm.get('collectionId').reset();
    this.LigandForm.get('locator').reset();
    this.LigandForm.get('diseaseName1').reset();
    this.LigandForm.get('diseaseName2').reset();
    this.LigandForm.get('diseaseName3').reset();
  }

  onRepeat() {
    let i = this.ligands.length - 1;
    for (i; i < this.ligands.length; i++) {
      if (this.ligands[i].status == "Submitted to QC") {
        this.calloutService.showWarning("This data can't be Edited. Already Submitted to Reviewer");
      }

      if (this.ligands[i].status != "Submitted to QC") {
        this.LigandForm.patchValue({
          'tanNumber': this.ligands[i].tanNumber,
          'ligandVersionSlno': this.ligands[i].ligandVersionSlno,
          'ligandTypeSlno': this.ligands[i].ligandTypeSlno,
          'ligandDetail': this.ligands[i].ligandDetail,
          'identifier1': this.ligands[i].identifier1,
          'identifier2': this.ligands[i].identifier2,
          'identifier3': this.ligands[i].identifier3,
          'collectionId': this.ligands[i].collectionId,
          'locator': this.ligands[i].locator,
          'diseaseName1': this.ligands[i].diseaseName1,
          'diseaseName2': this.ligands[i].diseaseName2,
          'diseaseName3': this.ligands[i].diseaseName3,
          'targetVersion': this.ligands[i].targetVersion,
          'collectionId1': this.ligands[i].collectionId1,
          'original': this.ligands[i].original,
          'acronym': this.ligands[i].acronym,
          'organism': this.ligands[i].organism,
          'variant': this.ligands[i].variant,
        });
      }
    }
  }

  onEdit() {
    let i = this.ligands.length - 1;
    for (i; i < this.ligands.length; i++) {

      if (this.ligands[i].status == "Submitted to QC") {
        this.calloutService.showWarning("This data can't be Edited. Already Submitted to Reviewer");
      }

      if (this.ligands[i].status != "Submitted to QC") {
        this.insertUser = this.ligands[i].insertUser;
        this.insertDatetime = new Date();
        this.ligandId = this.ligands[i].ligandId;
        this.LigandForm.patchValue({
          // 'ligandId': this.ligand[i].ligandId,
          'tanNumber': this.ligands[i].tanNumber,
          'ligandVersionSlno': this.ligands[i].ligandVersionSlno,
          'ligandTypeSlno': this.ligands[i].ligandTypeSlno,
          'ligandDetail': this.ligands[i].ligandDetail,
          'identifier1': this.ligands[i].identifier1,
          'identifier2': this.ligands[i].identifier2,
          'identifier3': this.ligands[i].identifier3,
          'collectionId': this.ligands[i].collectionId,
          'locator': this.ligands[i].locator,
          'diseaseName1': this.ligands[i].diseaseName1,
          'diseaseName2': this.ligands[i].diseaseName2,
          'diseaseName3': this.ligands[i].diseaseName3,
          'targetVersion': this.ligands[i].targetVersion,
          'collectionId1': this.ligands[i].collectionId1,
          'original': this.ligands[i].original,
          'acronym': this.ligands[i].acronym,
          'organism': this.ligands[i].organism,
          'variant': this.ligands[i].variant,
        });
      }
    }
  }
}

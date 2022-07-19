import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { TaskAllocationManager } from 'src/app/shared/services/restcontroller/bizservice/taskAllocation.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
import { Ligand001wb } from 'src/app/shared/services/restcontroller/entities/Ligand001wb';
import { Measurement001wb } from 'src/app/shared/services/restcontroller/entities/Measurement001wb';
import { Taskallocation001wb } from 'src/app/shared/services/restcontroller/entities/Taskallocation001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-reviewer-task',
  templateUrl: './reviewer-task.component.html',
  styleUrls: ['./reviewer-task.component.css']
})
export class ReviewerTaskComponent implements OnInit {

  headerText: string = ";"
  @Input() acc: string = '';
  reviewerTanNo: any;
  curatorTanNo?: any;

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

  completedByReviewers: Assay001wb[] = [];
  ligand: Ligand001wb[] = [];
  // Ligandversions=Ligandversion001mb[] = [];
  // Ligandtypes=Ligandtype001mb[] = [];
  assays: Assay001wb[] = [];
  reviewerDatas: Assay001wb[] = [];
  measurement: Measurement001wb[] = [];
  taskallocations: Taskallocation001wb[] = [];
  mytaskallocations: Taskallocation001wb[] = [];
  username: any
  hexToRgb: any;
  rgbToHex: any;
  tanNumber?: string | null;

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
    private taskAllocationManager: TaskAllocationManager,
    private router: Router,
    private http: HttpClient,
    private ligandManager: LigandManager,
    private assayManager: AssayManager,
    private datepipe: DatePipe,
  ) {

    this.frameworkComponents = {
      iconRenderer: IconRendererComponent,

    }
  }

  ngOnInit(): void {

    this.createDataGrid001();



    this.username = this.authManager.getcurrentUser.username;

    this.taskAllocationManager.findByReviewerTanNo(this.username).subscribe(response => {
      this.taskallocations = deserialize<Taskallocation001wb[]>(Taskallocation001wb, response);
      // console.log("status-->", this.taskallocations)
      this.mytaskallocations=this.taskallocations.reverse();
      if (this.taskallocations.length > 0) {

        this.gridOptions?.api?.setRowData(this.mytaskallocations);
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
        headerName: 'CURATOR NAME',
        field: 'curatorName',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'BATCH NUMBER',
        field: 'rbatchNo',
        width: 150,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'TAN NUMBER',
        field: 'curatorTanNo',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Submitted QC Date',
        field: 'updatedDatetime',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.updatedDatetime ? this.datepipe.transform(params.data.updatedDatetime, 'dd-MM-yyyy') : '';
        }
      },
      // {
      //   headerName: 'STATUS',
      //   field: 'status',
      //   width: 150,
      //   flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true,
      // },


      {
        headerName: 'REVIEWER NAME',
        field: 'reviewerName',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'START',
        cellRenderer: 'iconRenderer',
        width: 150,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onMoveToReviewer.bind(this),
          label: 'Start',

        },
      },


    ]
  }



  onMoveToReviewer(params: any) {
    if (params.data.reviewerStatus == "Completed") {
      this.calloutService.showWarning("Already this TAN NUNBER Completed!!. You can`t process");
    }
    else if( params.data.reviewerStatus == "Rejected by QC"){
      this.calloutService.showWarning("This TAN NUNBER Rejected by QC!!.");
    }
    else {
      this.router.navigate(["/app-dash-board/app-stepper", { "tanNumber": params.data.reviewerTanNo }]);
    }
  }










}

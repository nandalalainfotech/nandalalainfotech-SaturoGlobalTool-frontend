import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
import { TaskAllocationManager } from 'src/app/shared/services/restcontroller/bizservice/taskAllocation.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
import { Ligand001wb } from 'src/app/shared/services/restcontroller/entities/Ligand001wb';
import { Taskallocation001wb } from 'src/app/shared/services/restcontroller/entities/Taskallocation001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-reviewer-export',
  templateUrl: './reviewer-export.component.html',
  styleUrls: ['./reviewer-export.component.css']
})
export class ReviewerExportComponent implements OnInit {


  // public LigandForm: FormGroup | any;
  // public CheckedForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;
  public gridOptions: GridOptions | any;
  // public gridOptions1: GridOptions | any;
  // public gridOptions2: GridOptions | any;
  ligandId: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  // searchPopup: string = '';
  rbatchNo?: string | any;
  startDate: Date | any;
  endDate: Date | any;
  ligand: Ligand001wb[] = [];
  assays: Assay001wb[] = [];
  inProcessAssays: Assay001wb[] = [];
  completedByReviewers: Assay001wb[] = [];
  completedByReviewExport: Taskallocation001wb[] = [];
  assay: Assay001wb[] = [];
  taskallocations: Taskallocation001wb[] = [];
  exportExcelDatas: Taskallocation001wb[] = [];
  startEndDateValues: Taskallocation001wb[] = [];
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
    private taskAllocationManager: TaskAllocationManager,
    // private route: ActivatedRoute,
    private modalService: NgbModal,
    private ligandManager: LigandManager,
    private assayManager: AssayManager,
    private ligandReportsManager: LigandReportsManager,
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

    this.taskAllocationManager.findByReviewerTanNo(this.username).subscribe(response => {
      this.taskallocations = deserialize<Taskallocation001wb[]>(Taskallocation001wb, response);
      for (let taskallocation of this.taskallocations) {
        if (taskallocation.reviewerStatus == "Completed") {
          this.completedByReviewExport.push(taskallocation);
        }
        // console.log("this.completedByReviewExport-->>", this.completedByReviewExport);
      }



      if (this.taskallocations.length > 0) {
        this.gridOptions?.api?.setRowData(this.completedByReviewExport);
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
      // {
      //   headerName: 'Sl-No',
      //   field: '',
      //   width: 200,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true,
      // },
      {
        headerName: 'TAN EXCEL DOWNLOAD',
        cellRenderer: 'iconRenderer',
        width: 300,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onDownloadExcel.bind(this),
          label: 'Download',

        },

      },


      {
        headerName: 'TAN NUMBER',
        field: 'reviewerTanNo',
        width: 300,
        flex: 1,
        sortable: true,
        cellStyle: { textAlign: 'center' },
        filter: true,
        resizable: true,
        // headerCheckboxSelection: true,
        // headerCheckboxSelectionFilteredOnly: true,
        // checkboxSelection: true,
        suppressSizeToFit: true,
        // valueGetter: this.settanNumber.bind(this)
      },
      {
        headerName: ' BATCH NUMBER',
        field: 'rbatchNo',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'COMPLETED DATE',
        field: 'reviewerUpdatedDate',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },

    ];
  }
  onDownloadExcel(params: any) {
    this.ligandReportsManager.machineReportsTanExcel(params.data.reviewerTanNo).subscribe((response) => {
      const blob = new Blob([response], {
        type: 'application/zip'
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    })

  }

  onGenerateExcelReport() {

    //   for(let i=0; i<this.assays.length; i++){
    //     console.log("tan", this.assays[i].ligandSlno2?.tanNumber)
    //     this.tans.push(this.assays[i].ligandSlno2?.tanNumber)
    //   }

    //  let tanNos=new Set (this.tans)
    //  console.log("tanNos",tanNos);
    this.ligandReportsManager.machineReportsExcel(this.username).subscribe((response) => {
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



  onSearch(startDate: any, endDate: any, rbatchNo: any) {
    // let sDate = new Date(startDate);
    // let eDate = new Date(endDate);

    this.exportExcelDatas = [];

    if (startDate && endDate) {
      this.taskAllocationManager.findByStartEndDate(this.username, startDate, endDate).subscribe(response => {
        this.startEndDateValues = deserialize<Taskallocation001wb[]>(Taskallocation001wb, response);

        if (this.startEndDateValues.length > 0) {
          this.gridOptions?.api?.setRowData(this.startEndDateValues);
        } else {
          this.gridOptions?.api?.setRowData([]);
        }
        // this.startDate = "";
        // this.endDate = "";
      })

    }

    else {
      for (let i = 0; i < this.taskallocations.length; i++) {

        if ((this.taskallocations[i].rbatchNo == rbatchNo) && (this.taskallocations[i].reviewerName == this.username) && (this.taskallocations[i].reviewerStatus == "Completed")) {
          this.exportExcelDatas.push(this.taskallocations[i]);

        }
      }
      if (this.exportExcelDatas.length > 0) {
        this.gridOptions?.api?.setRowData(this.exportExcelDatas);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
      // this.rbatchNo = "";
    }
  }

  onBatchNumber(startDate: any, endDate: any, rbatchNo: any) {
    if (startDate || endDate || rbatchNo) {
      if (startDate && endDate) {

        this.ligandReportsManager.startEndDateExportExcel(this.username, startDate, endDate).subscribe((response) => {
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
        // this.startDate = "";
        // this.endDate = "";

      }
      else {

        this.ligandReportsManager.batchNumberExportExcel(this.username, rbatchNo).subscribe((response) => {
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
        // this.rbatchNo = "";
      }
    }
    else {
      this.calloutService.showWarning("Please Select Date or Batch Number");
    }

  }




  setStatusName(params: any): string {
    return params.data.acc = "ok";
  }

}

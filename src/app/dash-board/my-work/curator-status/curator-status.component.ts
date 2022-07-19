import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { LigandReportsManager } from 'src/app/shared/services/restcontroller/bizservice/report.service';
import { TaskAllocationManager } from 'src/app/shared/services/restcontroller/bizservice/taskAllocation.service';
import { Taskallocation001wb } from 'src/app/shared/services/restcontroller/entities/Taskallocation001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-curator-status',
  templateUrl: './curator-status.component.html',
  styleUrls: ['./curator-status.component.css']
})
export class CuratorStatusComponent implements OnInit {


  frameworkComponents: any;
  submitted = false;
  public gridOptions: GridOptions | any;

  ligandId: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  startDate: Date | any;
  endDate: Date | any;
  cbatchNo: string = "";

  completedByReviewExport: Taskallocation001wb[] = [];
  taskallocations: Taskallocation001wb[] = [];

  username: any
  hexToRgb: any;
  rgbToHex: any;

  modalRef: any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private taskAllocationManager: TaskAllocationManager,
    private modalService: NgbModal,
    private ligandManager: LigandManager,
    private assayManager: AssayManager,
    private ligandReportsManager: LigandReportsManager,
    private datepipe: DatePipe,
    private http: HttpClient,
    private router: Router
  ) {

    this.frameworkComponents = {
      iconRenderer: IconRendererComponent,

    }
  }

  ngOnInit(): void {

    this.createDataGrid001();

    this.username = this.authManager.getcurrentUser.username;

    this.taskAllocationManager.findByTanNo(this.username).subscribe(response => {
      this.taskallocations = deserialize<Taskallocation001wb[]>(Taskallocation001wb, response);
      for (let taskallocation of this.taskallocations) {
        if ((taskallocation.status == "Submitted to QC") || (taskallocation.reviewerStatus == "Completed")) {
          this.completedByReviewExport.push(taskallocation);
        }
      }

      if (this.taskallocations.length > 0) {
        this.gridOptions?.api?.setRowData(this.completedByReviewExport);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  onAccepted() {

  }


  createDataGrid001(): void {

    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',

    };

    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: 'TAN EXCEL DOWNLOAD',
        cellRenderer: 'iconRenderer',
        width: 300,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onCuratorTanExcelDownload.bind(this),
          label: 'Download',

        },

      },

      {
        headerName: 'CURATOR NAME',
        field: 'curatorName',
        width: 150,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: ' BATCH NUMBER',
        field: 'cbatchNo',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'TAN NUMBER',
        field: 'curatorTanNo',
        width: 150,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'CURATOR STATUS',
        field: 'status',
        width: 150,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'SUBMITTED TO QC DATE',
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
    ];
  }

  onCuratorTanExcelDownload(params: any) {
    this.ligandReportsManager.curatorTanExcel(params.data.curatorTanNo).subscribe((response) => {
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
    // this.ligandReportsManager.machineReportsExcel(this.username).subscribe((response) => {
    //   // if (this.ligand) {
    //   //   saveAs(response);
    //   // } else {
    //   //   saveAs(response, "download");
    //   // }
    //   const blob = new Blob([response], {
    //     type: 'application/zip'
    //   });
    //   const url = window.URL.createObjectURL(blob);
    //   window.open(url);
    // })
  }


  onBatchDateSearch(startDate: any, endDate: any, cbatchNo: any) {

    if (cbatchNo) {

      this.taskAllocationManager.findByTanNo(this.username).subscribe(response => {
        this.taskallocations = deserialize<Taskallocation001wb[]>(Taskallocation001wb, response);

        let batcharray: Taskallocation001wb[] = [];
        for (let taskallocation of this.taskallocations) {

          if (taskallocation.cbatchNo == cbatchNo && ((taskallocation.status == "Submitted to QC") || (taskallocation.reviewerStatus == "Completed"))) {
            batcharray.push(taskallocation);
          }
        }

        // this.startDate = "";
        // this.endDate = "";
        // this.cbatchNo = "";

        if (batcharray.length > 0) {
          this.gridOptions?.api?.setRowData(batcharray);
        } else {
          this.gridOptions?.api?.setRowData([]);
        }
      });


    }

    let curatorDateValues: Taskallocation001wb[] = [];
    if (startDate && endDate) {
      this.taskAllocationManager.findByCuratorStartEndDate(this.username, startDate, endDate).subscribe(response => {
        curatorDateValues = deserialize<Taskallocation001wb[]>(Taskallocation001wb, response);

        // this.startDate = "";
        // this.endDate = "";
        // this.cbatchNo = "";

        if (curatorDateValues.length > 0) {
          this.gridOptions?.api?.setRowData(curatorDateValues);
        } else {
          this.gridOptions?.api?.setRowData([]);
        }
      })

    }

  }

  onBatchNumber(startDate: any, endDate: any, cbatchNo: any) {
    if (startDate || endDate || cbatchNo) {
      if (startDate && endDate) {

        this.ligandReportsManager.curatorStartEndDateExportExcel(this.username, startDate, endDate).subscribe((response) => {

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

        this.ligandReportsManager.curatorBatchNumberExportExcel(this.username, cbatchNo).subscribe((response) => {

          const blob = new Blob([response], {
            type: 'application/zip'
          });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        })

      }
      // }

      // this.cbatchNo = "";
      // }

    }
    else {
      this.calloutService.showWarning("Please Select Date or Batch Number");
    }

  }


}
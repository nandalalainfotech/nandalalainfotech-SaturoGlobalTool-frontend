import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { TaskAllocationManager } from 'src/app/shared/services/restcontroller/bizservice/taskAllocation.service';
import { Taskallocation001wb } from 'src/app/shared/services/restcontroller/entities/Taskallocation001wb';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.css']
})
export class TaskStatusComponent implements OnInit {
  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  username: string | undefined;
  taskallocations: Taskallocation001wb[] = [];
  constructor( private authManager: AuthManager,
    private taskAllocationManager: TaskAllocationManager,
    private datepipe: DatePipe,) {
   
   }

  ngOnInit(): void {
    this.createDataGrid001();
    this.username = this.authManager.getcurrentUser.username;
    this.taskAllocationManager.alltask(this.username).subscribe(response => {
      this.taskallocations = deserialize<Taskallocation001wb[]>(Taskallocation001wb, response);

      if (this.taskallocations.length > 0) {
        this.gridOptions?.api?.setRowData(this.taskallocations);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
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
        headerName: 'CURATOR ID',
        field: 'taskallocationSlno',
        width: 100,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },

      {
        headerName: 'CURATOR NAME',
        field: 'curatorName',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setCuratorName.bind(this)
      },
      {
        headerName: 'CURATOR BATCH NUMBER',
        field: 'cbatchNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'CURATOR TAN NUMBER',
        field: 'curatorTanNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'ALLOCATED ON',
        // field: 'curatorTanNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.curatorAllocateDate ? this.datepipe.transform(params.data.curatorAllocateDate, 'dd-MM-yyyy') : '';
        }
      },
      {
        headerName: 'STATUS',
        field: 'status',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: (params: any) => {
        //   return params.data.curatorAllocateDate ? this.datepipe.transform(params.data.curatorAllocateDate, 'dd-MM-yyyy') : '';
        // }
      },
      {
        headerName: 'COMPLETED ON',
        // field: 'curatorTanNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.updatedDatetime ? this.datepipe.transform(params.data.updatedDatetime, 'dd-MM-yyyy') : '';
        }
      },

      {
        headerName: 'REVIEWER NAME',
        field: 'reviewerName',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'REVIEWER BATCH NUMBER',
        field: 'rbatchNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'REVIEWER TAN NUMBER',
        field: 'reviewerTanNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Date Allocated on',
        // field: 'curatorTanNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.reviewerAllocateDate ? this.datepipe.transform(params.data.reviewerAllocateDate, 'dd-MM-yyyy') : '';
        }
      },

      {
        headerName: 'ReviewerStatus',
        field: 'reviewerStatus',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: (params: any) => {
        //   return params.data.curatorAllocateDate ? this.datepipe.transform(params.data.curatorAllocateDate, 'dd-MM-yyyy') : '';
        // }
      },
      {
        headerName: 'COMPLETED ON',
        // field: 'curatorTanNo',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.reviewerUpdatedDate ? this.datepipe.transform(params.data.reviewerUpdatedDate, 'dd-MM-yyyy') : '';
        }
      },

      
    ];
  }


  onGenerateExcelReport() {
    this.taskAllocationManager.taskStatusExcel().subscribe((response) => {
            saveAs(response, "Task Status");
    })
}
}

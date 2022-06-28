import { DatePipe } from '@angular/common';
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
import { TaskAllocationManager } from 'src/app/shared/services/restcontroller/bizservice/taskAllocation.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
import { Taskallocation001wb } from 'src/app/shared/services/restcontroller/entities/Taskallocation001wb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  submitted = false;
  public gridOptions: GridOptions | any;
  onFirstDataRendered: any;
  frameworkComponents: any;
  user?: User001mb;
  taskallocations: Taskallocation001wb[] = [];
  users: User001mb[] = [];
  username: any;
  assay: Assay001wb[] = [];

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private http: HttpClient,
    private modalService: NgbModal,
    private assayManager: AssayManager,
    private taskAllocationManager: TaskAllocationManager,
    private datepipe: DatePipe,
  ) { 
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {
    this.createDataGrid001();

    this.username = this.authManager.getcurrentUser.username;
    this.taskAllocationManager.findByTanNo(this.username).subscribe(response => {
      this.taskallocations = deserialize<Taskallocation001wb[]>(Taskallocation001wb, response);

      if (this.taskallocations.length > 0) {
        this.gridOptions?.api?.setRowData(this.taskallocations);
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

    };

    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: 'CURATOR ID',
        field: 'curatorId',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setMachineCode.bind(this)
      },
    
    // {
    //     headerName: 'STATUS',
    //     cellRenderer: 'iconRenderer',
    //     width: 100,
    //     flex: 1,
    //     suppressSizeToFit: true,
    //     cellStyle: { textAlign: 'center' },
    //     cellRendererParams: {
    //     onClick: this.onMoveToLigand.bind(this),
    //     label: 'Start',
    //   },
    // },
      {
        headerName: 'CURATOR NAME',
        field: 'curatorName',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setMachineName.bind(this)
      },
      {
        headerName: 'CURATOR TANNUMBER',
        field: 'curatorTanNo',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // cellRendererParams: {
        //   onClick: this.onMoveToLigand.bind(this),
        //   field: 'curatorTanNo',
        // },
      },
      {
        headerName: 'CURATOR BATCH NUMBER',
        field: 'cbatchNo',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'DATE',
        // field: 'date',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: (params: any) => {
          return params.data.curatorAllocateDate ? this.datepipe.transform(params.data.curatorAllocateDate, 'dd-MM-yyyy') : '';
        }
     
      // {
      //     headerName: 'Delete',
      //     cellRenderer: 'iconRenderer',
      //     width: 105,
      //     flex: 1,
      //     suppressSizeToFit: true,
      //     cellStyle: { textAlign: 'center' },
      //     cellRendererParams: {
      //         onClick: this.onDeleteButtonClick.bind(this),
      //         label: 'Delete'
      //     },
      // },
      // {
      //     headerName: 'Audit',
      //     cellRenderer: 'iconRenderer',
      //     width: 80,
      //     flex: 1,
      //     suppressSizeToFit: true,
      //     cellStyle: { textAlign: 'center' },
      //     cellRendererParams: {
      //         onClick: this.onAuditButtonClick.bind(this),
      //         label: 'Audit'
      //     },
      // },
    },
    ];
  }
  // onMoveToLigand(params: any) {
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       "tanNumber": params.data.curatorTanNo
  //     }
  //   };
    
  //   this.router.navigate(["/app-dash-board/app-stepper"],navigationExtras);
  // }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Assay";
    modalRef.componentInstance.details = params.data;
  }

}

import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { style } from 'd3';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { TaskAllocationManager } from 'src/app/shared/services/restcontroller/bizservice/taskAllocation.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { Taskallocation001wb } from 'src/app/shared/services/restcontroller/entities/Taskallocation001wb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-mytask',
  templateUrl: './mytask.component.html',
  styleUrls: ['./mytask.component.css']
})
export class MytaskComponent implements OnInit {
  bgcolor: any
  // TaskAllocationForm: FormGroup | any;
  submitted = false;
  public gridOptions: GridOptions | any;
  onFirstDataRendered: any;
  frameworkComponents: any;
  curatorTanNo: any;

  user?: User001mb;
  taskallocations: Taskallocation001wb[] = [];
  users: User001mb[] = [];
  username: any;

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  constructor(private http: HttpClient,
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private taskAllocationManager: TaskAllocationManager,
    private userManager: UserManager,
    private datepipe: DatePipe,
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

      if (this.taskallocations.length > 0) {
        this.gridOptions?.api?.setRowData(this.taskallocations);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

    this.authManager.currentUserSubject.subscribe((object: any) => {
      this.user = object;
      let rgb = Utils.hexToRgb(object.theme);
      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });
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
      // {
      //   headerName: 'CURATOR ID',
      //   field: 'curatorId',
      //   width: 200,
      //   flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true,
      //   // valueGetter: this.setMachineCode.bind(this)
      // },


      {
        headerName: 'CURATOR NAME',
        field: 'curatorName',
        width: 150,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        // valueGetter: this.setMachineName.bind(this)
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
        // cellRendererParams: {
        //   onClick: this.onMoveToLigand.bind(this),
        //   field: 'curatorTanNo',
        // },
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
        // valueGetter: this.setMachineName.bind(this)
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
        headerName: 'START',
        cellRenderer: 'iconRenderer',
        width: 10,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onMoveToLigand.bind(this),
          label: 'Start',

        },

      },
      //       {
      //         headerName: 'ALLOCATED DATE',
      //         field: 'curatorAllocateDate',
      //         width: 200,
      //         flex: 1,
      //         sortable: true,
      //         filter: true,
      //         resizable: true,
      //         suppressSizeToFit: true,
      //         valueGetter: (params: any) => {
      //           return params.data.curatorAllocateDate ? this.datepipe.transform(params.data.curatorAllocateDate, 'dd-MM-yyyy') : '';
      //         }
      // },
    ];
  }
  onMoveToLigand(params: any) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "tanNumber": params.data.curatorTanNo
      }
    };
    if (params.data.status == "Submitted to QC") {
      this.calloutService.showWarning("Already this TAN NUNBER submitted to QC!!. You can`t process");
    }
    else if( params.data.status == "Rejected by QC"){
      this.calloutService.showWarning("This TAN NUNBER Rejected by QC!!. You can view it in Rejected by Reviewer Tab");
    }
    else {
      this.router.navigate(["/app-dash-board/app-stepper"], navigationExtras);
    }
  }

}

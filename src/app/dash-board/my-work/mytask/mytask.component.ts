import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
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

  // TaskAllocationForm: FormGroup | any;
  submitted = false;
  public gridOptions: GridOptions | any;
  onFirstDataRendered: any;
  frameworkComponents: any;

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
      console.log("this.taskallocations in mytask", this.taskallocations);

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
        suppressSizeToFit: true
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
        headerName: 'Date',
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
      },
      // {
      //     headerName: 'Edit',
      //     cellRenderer: 'iconRenderer',
      //     width: 100,
      //     flex: 1,
      //     suppressSizeToFit: true,
      //     cellStyle: { textAlign: 'center' },
      //     cellRendererParams: {
      //         onClick: this.onEditButtonClick.bind(this),
      //         label: 'Edit'
      //     },
      // },
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
    ];
  }

}

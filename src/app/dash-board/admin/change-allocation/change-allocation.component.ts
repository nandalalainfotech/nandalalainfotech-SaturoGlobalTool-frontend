import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  selector: 'app-change-allocation',
  templateUrl: './change-allocation.component.html',
  styleUrls: ['./change-allocation.component.css']
})
export class ChangeAllocationComponent implements OnInit {
  TaskAllocationForm: FormGroup | any;
  submitted = false;
  public gridOptions: GridOptions | any;
  onFirstDataRendered: any;
  frameworkComponents: any;
  changeCuratorName?: string | any;
  curatorSlno: number | any;
  taskallocationSlno: number | any;
  curatorName: string | any;
  curatorTanNo: string = "";
  cbatchNo?: string | any;
  curatorAllocateDate: Date | any;
  curatorCompleteDate: Date | any;
  reviewerSlno: number | any;
  reviewerName: string = "";
  reviewerTanNo: string = "";
  rbatchNo?: string | null;
  reviewerAllocateDate: Date | any;
  reviewerCompleteDate: Date | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  filename: string = "";
  selectedFile: any;
  element: any;
  rowData: any;

  user?: User001mb;
  taskallocations: Taskallocation001wb[] = [];
  changeAllocations: Taskallocation001wb[] = [];
  curators: User001mb[] = [];
  reviewers: User001mb[] = [];
  users: User001mb[] = [];
  username: any;
  curatornames: User001mb[] = [];
  selectedData: Taskallocation001wb[] = [];

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
    private datepipe: DatePipe,
    private userManager: UserManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent,
    }
  }

  ngOnInit(): void {
    this.createDataGrid001();

    // this.TaskAllocationForm = this.formBuilder.group({
    //   // curatorSlno: [''],
    //   // taskallocationSlno: [''],
    //   curatorName: [''],
    //   // curatorTanNo: [''],
    //   cbatchNo: [''],
    //   // curatorAllocateDate: [''],
    //   // curatorCompleteDate: [''],
    //   // reviewerSlno: [''],
    //   // reviewerName: [''],
    //   // reviewerTanNo: [''],
    //   // reviewerAllocateDate: [''],
    //   // reviewerCompleteDate: [''],
    //   // filename: ['']

    // });

    this.authManager.currentUserSubject.subscribe((object: any) => {
      this.user = object;
      let rgb = Utils.hexToRgb(object.theme);
      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });

    this.loadData();
  }

  // public getJSON(): Observable<any> {
  //   return this.http.get("./assets/json/admin.json");
  // }

  loadData() {
    this.username = this.authManager.getcurrentUser.username;
    this.taskAllocationManager.alltask(this.username).subscribe(response => {
      this.taskallocations = deserialize<Taskallocation001wb[]>(Taskallocation001wb, response);

      if (this.taskallocations.length > 0) {
        this.gridOptions?.api?.setRowData(this.taskallocations);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

    this.userManager.allcuratorName().subscribe((response) => {
      this.curatornames = deserialize<User001mb[]>(User001mb, response);

    })

    this.userManager.allcurator().subscribe((response) => {
      this.curators = deserialize<User001mb[]>(User001mb, response);

    })

    this.userManager.allreviewer().subscribe((response) => {
      this.reviewers = deserialize<User001mb[]>(User001mb, response);

    })

  }

  get f() { return this.TaskAllocationForm.controls; }

  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 100,
      rowSelection: 'multiple',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      // {
      //   headerName: 'Edit',
      //   cellRenderer: 'iconRenderer',
      //   width: 80,
      //   // flex: 1,
      //   suppressSizeToFit: true,
      //   cellStyle: { textAlign: 'center' },
      //   cellRendererParams: {
      //     onClick: this.onEditButtonClick.bind(this),
      //     label: 'Edit'
      //   },
      // },
      {
        headerName: 'TASK ALLOCATION SLNO',
        field: 'taskallocationSlno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
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

      // {
      //   headerName: 'CURATOR DATE ALLOCATED',
      //   width: 200,
      //   flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true,
      //   valueGetter: (params: any) => {
      //     return params.data.curatorAllocateDate ? this.datepipe.transform(params.data.curatorAllocateDate, 'dd-MM-yyyy') : '';
      //   }
      // },


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
      // {
      //   headerName: 'REVIEWER DATE ALLOCATED',
      //   width: 200,
      //   flex: 1,
      //   sortable: true,
      //   filter: true,
      //   resizable: true,
      //   suppressSizeToFit: true,
      //   valueGetter: (params: any) => {
      //     return params.data.reviewerAllocateDate ? this.datepipe.transform(params.data.reviewerAllocateDate, 'dd-MM-yyyy') : '';
      //   }
      // },


    ];
  }
  // onEditButtonClick(params: any) {

  //     this.taskallocationSlno = params.data.taskallocationSlno;
  //     this.insertUser = params.data.insertUser;
  //     this.insertDatetime = params.data.insertDatetime;
  //     this.TaskAllocationForm.patchValue({
  //       'curatorName': params.data.curatorName,
  //       'curatorTanNo': params.data.curatorTanNo,
  //       'reviewerName': params.data.reviewerName,

  //     });

  // }

  onGetSelectedRowData(changeCuratorName: any) {
    let selectedNodes = this.gridOptions?.api?.getSelectedNodes();
    this.selectedData = selectedNodes.map((node: { data: any; }) => node.data);
   
    for (let i = 0; i < this.selectedData.length; i++) {
      let taskallocation001wb = new Taskallocation001wb();
      taskallocation001wb.curatorName = changeCuratorName;
      taskallocation001wb.cbatchNo = this.selectedData[i].cbatchNo;
      taskallocation001wb.curatorTanNo = this.selectedData[i].curatorTanNo;
      taskallocation001wb.curatorAllocateDate = this.selectedData[i].curatorAllocateDate;
      taskallocation001wb.status = this.selectedData[i].status;
      taskallocation001wb.reviewerName = this.selectedData[i].reviewerName;
      taskallocation001wb.rbatchNo = this.selectedData[i].rbatchNo;
      taskallocation001wb.reviewerTanNo = this.selectedData[i].reviewerTanNo;
      taskallocation001wb.reviewerAllocateDate = this.selectedData[i].reviewerAllocateDate;
      taskallocation001wb.reviewerStatus = this.selectedData[i].reviewerStatus;

      taskallocation001wb.taskallocationSlno = this.selectedData[i].taskallocationSlno;
      taskallocation001wb.insertUser = this.selectedData[i].insertUser;
      taskallocation001wb.insertDatetime = this.selectedData[i].insertDatetime;
      taskallocation001wb.updatedUser = this.authManager.getcurrentUser.username;
      taskallocation001wb.updatedDatetime = new Date();
      this.taskAllocationManager.taskupdate(taskallocation001wb).subscribe((response) => {

        this.loadData();
        // this.TaskAllocationForm.reset();
        this.taskallocationSlno = null;
        this.submitted = false;
      });
     
      // else {
      // console.log("TaskAllocation save");

      // }
    }
    this.calloutService.showSuccess("Curator Name Changed Successfully");
  }

  onSearch(cbatchNo: any, curatorName: any) {
    
    this.changeAllocations = [];
    for (let i = 0; i < this.taskallocations.length; i++) {

      if ((this.taskallocations[i].cbatchNo == cbatchNo) && (this.taskallocations[i].curatorName == curatorName)) {
        this.changeAllocations.push(this.taskallocations[i]);

      }
    }
    this.cbatchNo="";
    this.curatorName="";
    if (this.changeAllocations.length > 0) {
      this.gridOptions?.api?.setRowData(this.changeAllocations);
    } else {
      this.gridOptions?.api?.setRowData([]);
    }
   
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }


  onChangeCurator(changeCuratorName: any) {


  }
  onReset() {
    this.submitted = false;
    this.TaskAllocationForm.reset();
  }

}

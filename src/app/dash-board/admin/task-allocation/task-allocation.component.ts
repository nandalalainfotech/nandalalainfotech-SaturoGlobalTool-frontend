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
  selector: 'app-task-allocation',
  templateUrl: './task-allocation.component.html',
  styleUrls: ['./task-allocation.component.css']
})
export class TaskAllocationComponent implements OnInit {
  TaskAllocationForm: FormGroup | any;
  submitted = false;
  public gridOptions: GridOptions | any;
  onFirstDataRendered: any;
  frameworkComponents: any;

  curatorSlno: number | any;
  taskallocationSlno: number | any;
  curatorName: string = "";
  curatorTanNo: string = "";
  curatorAllocateDate: Date | any;
  curatorCompleteDate: Date | any;
  reviewerSlno: number | any;
  reviewerName: string = "";
  reviewerTanNo: string = "";
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
  curators: User001mb[] = [];
  reviewers: User001mb[] = [];
  users: User001mb[] = [];
  username: any;
  taskallocates: Taskallocation001wb[] = [];

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

    this.TaskAllocationForm = this.formBuilder.group({
      // curatorSlno: [''],
      // // taskallocationSlno: [''],
      // curatorName: [''],
      // curatorTanNo: [''],
      // curatorAllocateDate: [''],
      // curatorCompleteDate: [''],
      // reviewerSlno: [''],
      // reviewerName: [''],
      // reviewerTanNo: [''],
      // reviewerAllocateDate: [''],
      // reviewerCompleteDate: [''],
      filename: ['']

    });

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
this.taskallocates=this.taskallocations.reverse();
      if (this.taskallocations.length > 0) {
        this.gridOptions?.api?.setRowData(this.taskallocates);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

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
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: 'TASK ALLOCATION SLNO',
        field: 'taskallocationSlno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        
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
 
  onCreatorChange(event: any) {
    let curatorName: string = '';
    for (let i = 0; i < this.curators.length; i++) {
      if (event && event.target.value == this.curators[i].personId) {
        // curatorName = this.curators[i].username;
        break;
      }
    }
    this.TaskAllocationForm.patchValue({
      'curatorName': curatorName
    });
  }

  onReviewerChange(event: any) {
    // let reviewerName: any = "";
    for (let i = 0; i < this.reviewers.length; i++) {
      if (event && event.target.value == this.reviewers[i].personId) {
        this.reviewerSlno = this.reviewers[i].personId;
        break;
      }
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

  onFileSelected(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  onTaskAllocationClick(event: any, TaskAllocationForm: any) {
    this.markFormGroupTouched(this.TaskAllocationForm);
    this.submitted = true;
    if (this.TaskAllocationForm.invalid) {
      return;
    }
    let taskallocation001wb = new Taskallocation001wb();
    // taskallocation001wb.curatorSlno = 1;
    // taskallocation001wb.curatorName = "moorthy";
    // taskallocation001wb.curatorTanNo = this.f.curatorTanNo.value ? this.f.curatorTanNo.value : "";
    // taskallocation001wb.curatorAllocateDate = this.f.curatorAllocateDate.value ? this.f.curatorAllocateDate.value : "";
    // taskallocation001wb.curatorCompleteDate = this.f.curatorCompleteDate.value ? this.f.curatorCompleteDate.value : "";
    // taskallocation001wb.reviewerSlno =  1;
    // taskallocation001wb.reviewerName = this.f.reviewerName.value ? this.f.reviewerName.value : "";
    // taskallocation001wb.reviewerTanNo = this.f.reviewerTanNo.value ? this.f.reviewerTanNo.value : "";
    // taskallocation001wb.reviewerAllocateDate = this.f.reviewerAllocateDate.value ? this.f.reviewerAllocateDate.value : "";
    // taskallocation001wb.reviewerCompleteDate = this.f.reviewerCompleteDate.value ? this.f.reviewerCompleteDate.value : "";
    // taskallocation001wb.filename = this.f.filename.value ? this.f.filename.value : "";
    if (this.taskallocationSlno) {
      taskallocation001wb.taskallocationSlno = this.taskallocationSlno;
      taskallocation001wb.insertUser = this.insertUser;
      taskallocation001wb.insertDatetime = this.insertDatetime;
      taskallocation001wb.updatedUser = this.authManager.getcurrentUser.username;
      taskallocation001wb.updatedDatetime = new Date();
      this.taskAllocationManager.taskupdate(taskallocation001wb).subscribe((response) => {
        this.calloutService.showSuccess("TaskAllocation Details Updated Successfully");
        this.loadData();
        this.TaskAllocationForm.reset();
        this.taskallocationSlno = null;
        this.submitted = false;
      });
    }
    else {
      taskallocation001wb.insertUser = this.authManager.getcurrentUser.username;
      taskallocation001wb.insertDatetime = new Date();
      this.taskAllocationManager.tasksave(taskallocation001wb, this.selectedFile).subscribe((response) => {
        this.calloutService.showSuccess("TaskAllocation Details Saved Successfully");

        this.loadData();
        this.TaskAllocationForm.reset();
        this.submitted = false;

      });
    }

  }

  onReset() {
    this.submitted = false;
    this.TaskAllocationForm.reset();
  }

  }


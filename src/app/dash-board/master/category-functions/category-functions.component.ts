import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { CategoryfunctionManager } from 'src/app/shared/services/restcontroller/bizservice/categoryFunction.service';
import { Categoryfunction001mb } from 'src/app/shared/services/restcontroller/entities/Categoryfunction001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-category-functions',
  templateUrl: './category-functions.component.html',
  styleUrls: ['./category-functions.component.css']
})
export class CategoryFunctionsComponent implements OnInit {

  public CategoryFunctionForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  function: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  categoryfunctions: Categoryfunction001mb [] = [];

  
  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private categoryfunctionManager: CategoryfunctionManager,
  ) { 
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.createDataGrid001();

    this.CategoryFunctionForm = this.formBuilder.group({
      function: ['', Validators.required],
    });

    this.loadData();
  }

  loadData() {
    this.categoryfunctionManager.allcategoryFunction().subscribe(response => {
      this.categoryfunctions = deserialize<Categoryfunction001mb[]>(Categoryfunction001mb, response);
      if (this.categoryfunctions.length > 0) {
        this.gridOptions?.api?.setRowData(this.categoryfunctions);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }

  get f() { return this.CategoryFunctionForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
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
        headerName: 'SL-No',
        field: 'id',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Category Function',
        field: 'function',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 80,
        flex: 1,
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
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'left' },
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },
      {
        headerName: 'Audit',
        cellRenderer: 'iconRenderer',
        width: 80,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'left' },
        cellRendererParams: {
          onClick: this.onAuditButtonClick.bind(this),
          label: 'Audit'
        },
      },
    ];
  }

  onEditButtonClick(params: any) {
    this.id = params.data.id;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.CategoryFunctionForm.patchValue({
      'function': params.data.function,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Category function";
    modalRef.componentInstance.description = "Are you sure want to delete Category Function ?";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.categoryfunctionManager.categoryFunctiondelete(params.data.id).subscribe((response) => {
          for (let i = 0; i < this.categoryfunctions.length; i++) {
            if (this.categoryfunctions[i].id == params.data.id) {
              this.categoryfunctions?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Category Function Details Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Category function";
    modalRef.componentInstance.details = params.data;
  }

  oncategoryFunctionClick(event: any, CategoryFunctionForm: any) {
    this.markFormGroupTouched(this.CategoryFunctionForm);
    this.submitted = true;
    if (this.CategoryFunctionForm.invalid) {
      return;
    }

    let categoryfunction001mb = new Categoryfunction001mb();

    categoryfunction001mb.function = this.f.function.value ? this.f.function.value : "";   
    if (this.id) {
      categoryfunction001mb.id = this.id;
      categoryfunction001mb.insertUser = this.insertUser;
      categoryfunction001mb.insertDatetime = this.insertDatetime;
      categoryfunction001mb.updatedUser = this.authManager.getcurrentUser.username;
      categoryfunction001mb.updatedDatetime = new Date();
      this.categoryfunctionManager.categoryFunctionupdate(categoryfunction001mb).subscribe((response) => {
        this.calloutService.showSuccess("Category Function Details Updated Successfully");
        this.CategoryFunctionForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      categoryfunction001mb.insertUser = this.authManager.getcurrentUser.username;
      categoryfunction001mb.insertDatetime = new Date();
      this.categoryfunctionManager.categoryFunctionsave(categoryfunction001mb).subscribe((response) => {
        this.calloutService.showSuccess("Category Function Details Saved Successfully");
        this.CategoryFunctionForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }


  }

  onReset() {
    this.submitted = false;
    this.CategoryFunctionForm.reset();
  }

}

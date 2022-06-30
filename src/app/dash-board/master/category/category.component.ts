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
import { CategoryManager } from 'src/app/shared/services/restcontroller/bizservice/category.service';
import { ToxicityManager } from 'src/app/shared/services/restcontroller/bizservice/toxiCity.service';
import { Category001mb } from 'src/app/shared/services/restcontroller/entities/Category001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public CategoryForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  category: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  categorys: Category001mb [] = [];

  
  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private categoryManager: CategoryManager,
  ) { 
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.createDataGrid001();

    this.CategoryForm = this.formBuilder.group({
      category: ['', Validators.required],
    });

    this.loadData();
  }

  loadData() {
    this.categoryManager.allcategoryType().subscribe(response => {
      this.categorys = deserialize<Category001mb[]>(Category001mb, response);
      if (this.categorys.length > 0) {
        this.gridOptions?.api?.setRowData(this.categorys);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

  }

  get f() { return this.CategoryForm.controls; }

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
        headerName: 'Category',
        field: 'category',
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
    this.CategoryForm.patchValue({
      'category': params.data.category,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "toxiCity";
    modalRef.componentInstance.description = "Are you sure want to delete Category Type ?";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.categoryManager.categoryTypedelete(params.data.id).subscribe((response) => {
          for (let i = 0; i < this.categorys.length; i++) {
            if (this.categorys[i].id == params.data.id) {
              this.categorys?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Category Details Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Category";
    modalRef.componentInstance.details = params.data;
  }



  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  oncategoryClick(event: any, CategoryForm: any) {
    this.markFormGroupTouched(this.CategoryForm);
    this.submitted = true;
    if (this.CategoryForm.invalid) {
      return;
    }

    let category001mb = new Category001mb();

    category001mb.category = this.f.category.value ? this.f.category.value : "";   
    if (this.id) {
      category001mb.id = this.id;
      category001mb.insertUser = this.insertUser;
      category001mb.insertDatetime = this.insertDatetime;
      category001mb.updatedUser = this.authManager.getcurrentUser.username;
      category001mb.updatedDatetime = new Date();
      this.categoryManager.categoryTypeupdate(category001mb).subscribe((response) => {
        this.calloutService.showSuccess("Category Details Updated Successfully");
        this.CategoryForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      category001mb.insertUser = this.authManager.getcurrentUser.username;
      category001mb.insertDatetime = new Date();
      this.categoryManager.categoryTypesave(category001mb).subscribe((response) => {
        this.calloutService.showSuccess("Category Details Saved Successfully");
        this.CategoryForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }





  }

  onReset() {
    this.submitted = false;
    this.CategoryForm.reset();
  }

}

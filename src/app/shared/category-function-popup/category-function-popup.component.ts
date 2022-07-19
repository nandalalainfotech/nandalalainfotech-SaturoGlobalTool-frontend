import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { CategoryfunctionManager } from '../services/restcontroller/bizservice/categoryFunction.service';
import { Categoryfunction001mb } from '../services/restcontroller/entities/Categoryfunction001mb';
import { CalloutService } from '../services/services/callout.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-category-function-popup',
  templateUrl: './category-function-popup.component.html',
  styleUrls: ['./category-function-popup.component.css']
})
export class CategoryFunctionPopupComponent implements OnInit {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() details: any;
  hexToRgb: any;
  rgbToHex: any;
  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

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


  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private categoryfunctionManager: CategoryfunctionManager,
  ) { }

  ngOnInit(): void {
    this.CategoryFunctionForm = this.formBuilder.group({
      function: ['', Validators.required],
    });

    this.loadData();
    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });

    this.title = this.title;
  }

  loadData() {
    this.categoryfunctionManager.allcategoryFunction().subscribe(response => {
      this.categoryfunctions = deserialize<Categoryfunction001mb[]>(Categoryfunction001mb, response);
      // if (this.categoryfunctions.length > 0) {
      //   this.gridOptions?.api?.setRowData(this.categoryfunctions);
      // } else {
      //   this.gridOptions?.api?.setRowData([]);
      // }
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

  onOkClick() {
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
        // this.calloutService.showSuccess("Category Function Details Saved Successfully");
        this.CategoryFunctionForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }


    this.activeModal.close('Yes');
    this.loadData();
  }

  onCancelClick() {
    this.activeModal.close('No');
  }
}

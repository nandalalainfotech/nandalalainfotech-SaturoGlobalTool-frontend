import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { UnitlowendvalueManager } from '../services/restcontroller/bizservice/Unitlowendvalue.service';
import { Unitlowendvalue001mb } from '../services/restcontroller/entities/Unitlowendvalue001mb';
import { CalloutService } from '../services/services/callout.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-ligand-dose-highlowunit-popup',
  templateUrl: './ligand-dose-highlowunit-popup.component.html',
  styleUrls: ['./ligand-dose-highlowunit-popup.component.css']
})
export class LigandDoseHighlowunitPopupComponent implements OnInit {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() details: any;
  hexToRgb: any;
  rgbToHex: any;
  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  public UnitLowendForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  united: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  unitlowendvalue001: Unitlowendvalue001mb[] = [];


  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private unitlowendvalueManager: UnitlowendvalueManager,
  ) { }

  ngOnInit(): void {
    this.UnitLowendForm = this.formBuilder.group({
      united: ['', Validators.required],
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
    this.unitlowendvalueManager.allunitlowendvalue().subscribe(response => {
      this.unitlowendvalue001 = deserialize<Unitlowendvalue001mb[]>(Unitlowendvalue001mb, response);
      // if (this.unitlowendvalue001.length > 0) {
      //   this.gridOptions?.api?.setRowData(this.unitlowendvalue001);
      // } else {
      //   this.gridOptions?.api?.setRowData([]);
      // }
    });

  }
  get f() { return this.UnitLowendForm.controls; }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onOkClick() {
    this.markFormGroupTouched(this.UnitLowendForm);
    this.submitted = true;
    if (this.UnitLowendForm.invalid) {
      return;
    }

    let unitlowendvalue001mb = new Unitlowendvalue001mb();

    unitlowendvalue001mb.united = this.f.united.value ? this.f.united.value : "";
    if (this.id) {
      unitlowendvalue001mb.id = this.id;
      unitlowendvalue001mb.insertUser = this.insertUser;
      unitlowendvalue001mb.insertDatetime = this.insertDatetime;
      unitlowendvalue001mb.updatedUser = this.authManager.getcurrentUser.username;
      unitlowendvalue001mb.updatedDatetime = new Date();
      this.unitlowendvalueManager.unitlowendvalueupdate(unitlowendvalue001mb).subscribe((response) => {
        // this.calloutService.showSuccess("Unit (Low-EndValue) Updated Successfully");
        this.UnitLowendForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      unitlowendvalue001mb.insertUser = this.authManager.getcurrentUser.username;
      unitlowendvalue001mb.insertDatetime = new Date();
      this.unitlowendvalueManager.unitlowendvaluesave(unitlowendvalue001mb).subscribe((response) => {
        // this.calloutService.showSuccess("Unit (Low-EndValue) Saved Successfully");
        this.UnitLowendForm.reset();
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

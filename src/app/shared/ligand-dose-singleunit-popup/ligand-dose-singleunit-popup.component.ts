import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { UnitSingleValueManager } from '../services/restcontroller/bizservice/unitSingleValue.service';
import { Unitsinglevalue001mb } from '../services/restcontroller/entities/Unitsinglevalue001mb';
import { CalloutService } from '../services/services/callout.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-ligand-dose-singleunit-popup',
  templateUrl: './ligand-dose-singleunit-popup.component.html',
  styleUrls: ['./ligand-dose-singleunit-popup.component.css']
})
export class LigandDoseSingleunitPopupComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() details: any;
  hexToRgb: any;
  rgbToHex: any;
  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  public UnitSingleForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  unit: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  unitsinglevalue001: Unitsinglevalue001mb[] = [];

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private unitSingleValueManager: UnitSingleValueManager,
  ) { }

  ngOnInit(): void {
    this.UnitSingleForm = this.formBuilder.group({
      unit: ['', Validators.required],
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
    this.unitSingleValueManager.allunitSingleValue().subscribe(response => {
      this.unitsinglevalue001 = deserialize<Unitsinglevalue001mb[]>(Unitsinglevalue001mb, response);
      // if (this.unitsinglevalue001.length > 0) {
      //   this.gridOptions?.api?.setRowData(this.unitsinglevalue001);
      // } else {
      //   this.gridOptions?.api?.setRowData([]);
      // }
    });

  }

  get f() { return this.UnitSingleForm.controls; }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }


  onOkClick() {
    this.markFormGroupTouched(this.UnitSingleForm);
    this.submitted = true;
    if (this.UnitSingleForm.invalid) {
      return;
    }


    let unitsinglevalue001mb = new Unitsinglevalue001mb();

    unitsinglevalue001mb.unit = this.f.unit.value ? this.f.unit.value : "";
    if (this.id) {
      unitsinglevalue001mb.id = this.id;
      unitsinglevalue001mb.insertUser = this.insertUser;
      unitsinglevalue001mb.insertDatetime = this.insertDatetime;
      unitsinglevalue001mb.updatedUser = this.authManager.getcurrentUser.username;
      unitsinglevalue001mb.updatedDatetime = new Date();
      this.unitSingleValueManager.unitSingleValueupdate(unitsinglevalue001mb).subscribe((response) => {
        // this.calloutService.showSuccess("Unit (SingleValue) Details Updated Successfully");
        this.UnitSingleForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      unitsinglevalue001mb.insertUser = this.authManager.getcurrentUser.username;
      unitsinglevalue001mb.insertDatetime = new Date();
      this.unitSingleValueManager.unitSingleValuesave(unitsinglevalue001mb).subscribe((response) => {
        // this.calloutService.showSuccess("Unit (SingleValue) Details Saved Successfully");
        this.UnitSingleForm.reset();
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

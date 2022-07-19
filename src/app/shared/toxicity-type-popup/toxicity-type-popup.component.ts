import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { ToxicityManager } from '../services/restcontroller/bizservice/toxiCity.service';
import { Toxicity001mb } from '../services/restcontroller/entities/Toxicity001mb';
import { CalloutService } from '../services/services/callout.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-toxicity-type-popup',
  templateUrl: './toxicity-type-popup.component.html',
  styleUrls: ['./toxicity-type-popup.component.css']
})
export class ToxicityTypePopupComponent implements OnInit {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() details: any;
  hexToRgb: any;
  rgbToHex: any;
  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  public ToxixtytypeForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  toxiCity: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  toxi: Toxicity001mb[] = [];


  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private toxicityManager: ToxicityManager,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.ToxixtytypeForm = this.formBuilder.group({
      toxiCity: ['', Validators.required],
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
    this.toxicityManager.alltoxicityType().subscribe(response => {
      this.toxi = deserialize<Toxicity001mb[]>(Toxicity001mb, response);
      // if (this.toxi.length > 0) {
      //   this.gridOptions?.api?.setRowData(this.toxi);
      // } else {
      //   this.gridOptions?.api?.setRowData([]);
      // }
    });

  }

  get f() { return this.ToxixtytypeForm.controls; }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onOkClick() {
    this.markFormGroupTouched(this.ToxixtytypeForm);
    this.submitted = true;
    if (this.ToxixtytypeForm.invalid) {
      return;
    }

    let toxicity001mb = new Toxicity001mb();

    toxicity001mb.toxiCity = this.f.toxiCity.value ? this.f.toxiCity.value : "";   
    if (this.id) {
      toxicity001mb.id = this.id;
      toxicity001mb.insertUser = this.insertUser;
      toxicity001mb.insertDatetime = this.insertDatetime;
      toxicity001mb.updatedUser = this.authManager.getcurrentUser.username;
      toxicity001mb.updatedDatetime = new Date();
      this.toxicityManager.toxicityTypeupdate(toxicity001mb).subscribe((response) => {
        this.calloutService.showSuccess("Toxicity Details Updated Successfully");
        this.ToxixtytypeForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      toxicity001mb.insertUser = this.authManager.getcurrentUser.username;
      toxicity001mb.insertDatetime = new Date();
      this.toxicityManager.toxicityTypesave(toxicity001mb).subscribe((response) => {
        // this.calloutService.showSuccess("Toxicity Details Saved Successfully");
        this.ToxixtytypeForm.reset();
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

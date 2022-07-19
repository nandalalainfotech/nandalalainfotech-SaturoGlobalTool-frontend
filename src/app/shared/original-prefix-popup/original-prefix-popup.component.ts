import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { deserialize } from 'serializer.ts/Serializer';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { OriginalprefixManager } from '../services/restcontroller/bizservice/originalPrefix.service';
import { Originalprefix001mb } from '../services/restcontroller/entities/Originalprefix001mb';
import { CalloutService } from '../services/services/callout.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-original-prefix-popup',
  templateUrl: './original-prefix-popup.component.html',
  styleUrls: ['./original-prefix-popup.component.css']
})
export class OriginalPrefixPopupComponent implements OnInit {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() details: any;
  hexToRgb: any;
  rgbToHex: any;
  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  public OriginalPrefixForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  id: number | any;
  originalPrefix: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  Originals: Originalprefix001mb[] = [];

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private originalprefixManager: OriginalprefixManager,
  ) { }

  ngOnInit(): void {
    this.OriginalPrefixForm = this.formBuilder.group({
      originalPrefix: ['', Validators.required],
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
    this.originalprefixManager.alloriginalPrefix().subscribe(response => {
      this.Originals = deserialize<Originalprefix001mb[]>(Originalprefix001mb, response);
      // if (this.Originals.length > 0) {
      //   this.gridOptions?.api?.setRowData(this.Originals);
      // } else {
      //   this.gridOptions?.api?.setRowData([]);
      // }
    });


  }

  get f() { return this.OriginalPrefixForm.controls; }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onOkClick() {
    this.markFormGroupTouched(this.OriginalPrefixForm);
    this.submitted = true;
    if (this.OriginalPrefixForm.invalid) {
      return;
    }

    let originalprefix001mb = new Originalprefix001mb();

    originalprefix001mb.originalPrefix = this.f.originalPrefix.value ? this.f.originalPrefix.value : "";
    if (this.id) {
      originalprefix001mb.id = this.id;
      originalprefix001mb.insertUser = this.insertUser;
      originalprefix001mb.insertDatetime = this.insertDatetime;
      originalprefix001mb.updatedUser = this.authManager.getcurrentUser.username;
      originalprefix001mb.updatedDatetime = new Date();
      this.originalprefixManager.originalPrefixupdate(originalprefix001mb).subscribe((response) => {
        this.calloutService.showSuccess("Original Prefix Details Updated Successfully");
        this.OriginalPrefixForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      originalprefix001mb.insertUser = this.authManager.getcurrentUser.username;
      originalprefix001mb.insertDatetime = new Date();
      this.originalprefixManager.originalPrefixsave(originalprefix001mb).subscribe((response) => {
        // this.calloutService.showSuccess("Original Prefix Details Saved Successfully");
        this.OriginalPrefixForm.reset();
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

import { CdkStepper, StepState } from '@angular/cdk/stepper';
import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';
import { AssayComponent } from '../assay/assay.component';
import { LigandComponent } from '../ligand/ligand.component';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  rolename?: string = "";
  user?: User001mb;
  hexToRgb: any;
  rgbToHex: any;
  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  @ViewChild("Ligand", {static: false}) ligandComponent!: LigandComponent;
  @ViewChild("Assay", {static: false}) assayComponent!: AssayComponent;
  @ViewChild("cdkStepper", {static: false}) cdkStepper!: CdkStepper;

  selectedIndex: number = 0;

  constructor(private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,) { }

    
  ngOnInit(): void {
  
    this.authManager.currentUserSubject.subscribe((object: any) => {
      this.user = object;

      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });
  }

  onChangeSteps(event: any) {
    this.selectedIndex = event.selectedIndex;
    // if(event.selectedIndex == 0) {
    //   this.ligandComponent.ngOnInit();
    // }
    // if(event.selectedIndex == 1) {
    //   this.assayComponent.ngOnInit();
    // }
  }

}

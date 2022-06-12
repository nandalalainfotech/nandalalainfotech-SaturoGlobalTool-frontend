import { Component, HostBinding, OnInit } from '@angular/core';
import { deserialize } from 'serializer.ts/Serializer';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { LigandVersionManager } from 'src/app/shared/services/restcontroller/bizservice/ligandVersion.service';
import { MeasurementManager } from 'src/app/shared/services/restcontroller/bizservice/Measurement.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
import { Ligand001wb } from 'src/app/shared/services/restcontroller/entities/Ligand001wb';
import { Ligandtype001mb } from 'src/app/shared/services/restcontroller/entities/Ligandtype001mb';
import { Ligandversion001mb } from 'src/app/shared/services/restcontroller/entities/Ligandversion001mb';
import { Measurement001wb } from 'src/app/shared/services/restcontroller/entities/Measurement001wb';
import { Role001mb } from 'src/app/shared/services/restcontroller/entities/Role001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  
  ligand: Ligand001wb[] = [];
  assay: Assay001wb[] = [];
  measurement: Measurement001wb[] = [];
  user001mb?: User001mb;
  roles: Role001mb[] = [];
  hexToRgb: any;
  rgbToHex: any;


  ligandstatus: any;
  assaystatus: any;
  measurementstatus: any;
  

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  constructor(private authManager: AuthManager,
    private ligandManager: LigandManager,
    private assayManager: AssayManager,
    private measurementManager: MeasurementManager,
   ) { }

  ngOnInit(): void {

    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);
      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });

    this.loadData();


   
  }

  username = this.authManager.getcurrentUser.username;

  loadData() {
  
  }

  

}

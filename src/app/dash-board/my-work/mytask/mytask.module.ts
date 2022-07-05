import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MytaskRoutingModule } from './mytask-routing.module';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AgGridModule } from 'ag-grid-angular';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MytaskRoutingModule,
    AgGridModule.withComponents([]),
  ],
  providers:[DatePipe,AssayManager,LigandManager]
})
export class MytaskModule { }

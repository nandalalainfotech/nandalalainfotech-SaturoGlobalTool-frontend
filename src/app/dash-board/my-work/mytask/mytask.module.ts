import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MytaskRoutingModule } from './mytask-routing.module';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MytaskRoutingModule,
    AgGridModule.withComponents([]),
  ],
  providers:[DatePipe,AssayManager]
})
export class MytaskModule { }

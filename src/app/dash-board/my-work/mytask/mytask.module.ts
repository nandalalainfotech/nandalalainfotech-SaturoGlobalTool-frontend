import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MytaskRoutingModule } from './mytask-routing.module';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MytaskRoutingModule
  ],
  providers:[DatePipe,AssayManager]
})
export class MytaskModule { }

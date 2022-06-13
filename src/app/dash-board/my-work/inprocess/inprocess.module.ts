import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InprocessRoutingModule } from './inprocess-routing.module';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InprocessRoutingModule
  ],
  providers:[AssayManager]
})
export class InprocessModule { }

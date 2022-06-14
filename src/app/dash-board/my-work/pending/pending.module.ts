import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PendingRoutingModule } from './pending-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PendingRoutingModule
  ],
  providers:[DatePipe]
})
export class PendingModule { }

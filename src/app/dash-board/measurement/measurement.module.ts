import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeasurementRoutingModule } from './measurement-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MeasurementManager } from 'src/app/shared/services/restcontroller/bizservice/Measurement.service';
import { CategoryManager } from 'src/app/shared/services/restcontroller/bizservice/category.service';
import { CategoryfunctionManager } from 'src/app/shared/services/restcontroller/bizservice/categoryFunction.service';
import { OriginalprefixManager } from 'src/app/shared/services/restcontroller/bizservice/originalPrefix.service';
import { BioTypeManager } from 'src/app/shared/services/restcontroller/bizservice/type.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MeasurementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [MeasurementManager,CategoryManager,CategoryfunctionManager,OriginalprefixManager,BioTypeManager]
})
export class MeasurementModule { }

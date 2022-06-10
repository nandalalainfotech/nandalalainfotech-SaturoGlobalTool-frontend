import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetRoutingModule } from './target-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TargetRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),


  ]
})
export class TargetModule { }

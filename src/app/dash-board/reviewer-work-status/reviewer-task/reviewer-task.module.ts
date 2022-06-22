import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReviewerTaskRoutingModule } from './reviewer-task-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReviewerTaskRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),

  ],
  providers: [LigandManager,AssayManager,DatePipe,]
})
export class ReviewerTaskModule { }

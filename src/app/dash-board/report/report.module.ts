import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { MeasurementManager } from 'src/app/shared/services/restcontroller/bizservice/Measurement.service';
import { LigandReportsManager } from 'src/app/shared/services/restcontroller/bizservice/report.service';
import { TaskAllocationManager } from 'src/app/shared/services/restcontroller/bizservice/taskAllocation.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [LigandManager,AssayManager,MeasurementManager,LigandReportsManager,TaskAllocationManager]
})
export class ReportModule { }

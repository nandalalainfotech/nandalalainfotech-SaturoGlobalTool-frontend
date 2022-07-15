import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MyWorkRoutingModule } from './my-work-routing.module';
import { MytaskComponent } from './mytask/mytask.component';
import { InprocessComponent } from './inprocess/inprocess.component';
import { PendingComponent } from './pending/pending.component';
import { SubmittedToQcComponent } from './submitted-to-qc/submitted-to-qc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AgGridModule } from 'ag-grid-angular';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';
import { MatTabsModule } from '@angular/material/tabs';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyWorkComponent } from './my-work.component';
import { RejectedByReviewerComponent } from './rejected-by-reviewer/rejected-by-reviewer.component';
import { CuratorStatusComponent } from './curator-status/curator-status.component';


@NgModule({
  declarations: [
    MyWorkComponent,
    MytaskComponent,
    InprocessComponent,
    PendingComponent,
    SubmittedToQcComponent,
    RejectedByReviewerComponent,
    CuratorStatusComponent
  ],

  imports: [
    CommonModule,
    MyWorkRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    // MatNativeDateModule,
    // MatInputModule,
    AgGridModule.withComponents([]),
    AgrenderercomponentModule,
    MatTabsModule,
    BreadcrumbModule,
    NgbModule
  ],
  providers:[DatePipe]

})
export class MyWorkModule { }

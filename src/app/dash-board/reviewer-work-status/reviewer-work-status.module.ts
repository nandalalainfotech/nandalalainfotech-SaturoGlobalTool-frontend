import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { ReviewerCompletedTaskComponent } from './reviewer-completed-task/reviewer-completed-task.component';
import { ReviewerInprocessTaskComponent } from './reviewer-inprocess-task/reviewer-inprocess-task.component';
import { ReviewerTaskComponent } from './reviewer-task/reviewer-task.component';
import { ReviewerWorkStatusRoutingModule } from './reviewer-work-status-routing.module';
import { ReviewerWorkStatusComponent } from './reviewer-work-status.component';
import { ReviewerExportComponent } from './reviewer-export/reviewer-export.component';


@NgModule({
  declarations: [
    ReviewerTaskComponent,
    ReviewerCompletedTaskComponent,
    ReviewerInprocessTaskComponent,
    ReviewerWorkStatusComponent,
    ReviewerExportComponent
  ],
  imports: [
    CommonModule,
    ReviewerWorkStatusRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    AgGridModule.withComponents([]),
    AgrenderercomponentModule,
    MatTabsModule,
    BreadcrumbModule,
    NgbModule
  ],

})
export class ReviewerWorkStatusModule { }

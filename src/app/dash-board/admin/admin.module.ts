import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { AgGridModule } from 'ag-grid-angular';
import { AgrenderercomponentModule } from 'src/app/shared/services/agrenderercomponent/agrenderercomponent.module';
import { TaskAllocationManager } from 'src/app/shared/services/restcontroller/bizservice/taskAllocation.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { AdminRoutingModule } from './admin-routing.module';
import { TaskAllocationComponent } from './task-allocation/task-allocation.component';
import { TaskStatusComponent } from './task-status/task-status.component';
import { ChangeAllocationComponent } from './change-allocation/change-allocation.component';
import { ReviewerChangeComponent } from './reviewer-change/reviewer-change.component';

@NgModule({
  declarations: [TaskAllocationComponent, TaskStatusComponent, ChangeAllocationComponent, ReviewerChangeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    MatTabsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    AgrenderercomponentModule,
  ],
  providers: [TaskAllocationManager,DatePipe,UserManager
   ]
})
export class AdminModule { }

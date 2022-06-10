import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { TaskAllocationManager } from 'src/app/shared/services/restcontroller/bizservice/taskAllocation.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BreadcrumbModule,
    AgGridModule.withComponents([])
  ],
  providers: [TaskAllocationManager,DatePipe,UserManager
   ]
})
export class AdminModule { }

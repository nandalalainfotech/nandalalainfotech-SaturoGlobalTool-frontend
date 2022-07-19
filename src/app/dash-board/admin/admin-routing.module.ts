import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ChangeAllocationComponent } from './change-allocation/change-allocation.component';
import { ReviewerChangeComponent } from './reviewer-change/reviewer-change.component';
import { TaskAllocationComponent } from './task-allocation/task-allocation.component';
import { TaskStatusComponent } from './task-status/task-status.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,

    children: [
      {
        path: 'app-task-allocation',
        component: TaskAllocationComponent,
      },
      {
        path: 'app-change-allocation',
        component: ChangeAllocationComponent,
      },
      {
        path: 'app-task-status',
        component: TaskStatusComponent,
      },
      {
        path: 'app-reviewer-change',
        component: ReviewerChangeComponent,
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

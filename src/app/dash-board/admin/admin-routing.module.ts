import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
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
        path: 'app-task-status',
        component: TaskStatusComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

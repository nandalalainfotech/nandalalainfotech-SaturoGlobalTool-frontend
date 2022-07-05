import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewerWorkStatusComponent } from './reviewer-work-status.component';

const routes: Routes = [{
  path: '',
  component: ReviewerWorkStatusComponent,

  children: [

    {
      path: 'app-reviewer-task',
      loadChildren: () => import("./reviewer-task/reviewer-task.module").then(m => m.ReviewerTaskModule)
    },
    {
      path: 'app-reviewer-inprocess-task',
      loadChildren: () => import("./reviewer-inprocess-task/reviewer-inprocess-task.module").then(m => m.ReviewerInprocessTaskModule)
    },
    {
      path: 'app-reviewer-completed-task',
      loadChildren: () => import("./reviewer-completed-task/reviewer-completed-task.module").then(m => m.ReviewerCompletedTaskModule)
    },
    {
      path: 'app-reviewer-export',
      loadChildren: () => import("./reviewer-export/reviewer-export.module").then(m => m.ReviewerExportModule)
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerWorkStatusRoutingModule { }

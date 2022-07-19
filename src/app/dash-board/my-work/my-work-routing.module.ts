import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuratorStatusComponent } from './curator-status/curator-status.component';
import { MyWorkComponent } from './my-work.component';

const routes: Routes = [
  {
    path: "",
    component: MyWorkComponent,

    children: [
      {
        path: 'app-mytask',
        loadChildren: () => import("./mytask/mytask.module").then(m => m.MytaskModule)
      },
      {
        path: 'app-inprocess',
        loadChildren: () => import("./inprocess/inprocess.module").then(m => m.InprocessModule)
      },
      {
        path: 'app-pending',
        loadChildren: () => import("./pending/pending.module").then(m => m.PendingModule)
      },
      {
        path: 'app-submitted-to-qc',
        loadChildren: () => import("./submitted-to-qc/submitted-to-qc.module").then(m => m.SubmittedToQcModule)
      },

      {
        path: 'app-rejected-by-reviewer',
        loadChildren: () => import("./rejected-by-reviewer/rejected-by-reviewer.module").then(m => m.RejectedByReviewerModule)
      },

      {
        path: 'app-curator-status',
        component: CuratorStatusComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWorkRoutingModule { }

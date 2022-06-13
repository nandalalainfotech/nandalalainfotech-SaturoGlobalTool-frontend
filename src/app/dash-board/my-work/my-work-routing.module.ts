import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWorkRoutingModule { }
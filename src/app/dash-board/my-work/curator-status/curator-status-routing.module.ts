import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuratorStatusComponent } from './curator-status.component';

const routes: Routes = [
  {
    path: 'app-curator-status',
    component: CuratorStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuratorStatusRoutingModule { }

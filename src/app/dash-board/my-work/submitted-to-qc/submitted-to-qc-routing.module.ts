import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmittedToQcComponent } from './submitted-to-qc.component';

const routes: Routes = [
  {
    path: '',
    component: SubmittedToQcComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmittedToQcRoutingModule { }

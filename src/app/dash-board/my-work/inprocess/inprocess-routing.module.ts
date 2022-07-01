import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InprocessComponent } from './inprocess.component';

const routes: Routes = [
  {
    path: '',
    component: InprocessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InprocessRoutingModule { }

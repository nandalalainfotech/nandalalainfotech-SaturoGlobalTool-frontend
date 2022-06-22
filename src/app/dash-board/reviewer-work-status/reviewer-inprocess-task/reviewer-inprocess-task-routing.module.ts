import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewerInprocessTaskComponent } from './reviewer-inprocess-task.component';

const routes: Routes = [
  {
    path:'',
    component:ReviewerInprocessTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerInprocessTaskRoutingModule { }

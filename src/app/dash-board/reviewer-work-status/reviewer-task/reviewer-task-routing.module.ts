import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewerTaskComponent } from './reviewer-task.component';

const routes: Routes = [
  {
    path:'',
    component:ReviewerTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerTaskRoutingModule { }

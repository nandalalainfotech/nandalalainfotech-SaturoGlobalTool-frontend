import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewerCompletedTaskComponent } from './reviewer-completed-task.component';

const routes: Routes = [
  {
    path:'',
    component:ReviewerCompletedTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerCompletedTaskRoutingModule { }

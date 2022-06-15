import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RejectedByReviewerComponent } from './rejected-by-reviewer.component';

const routes: Routes = [
  {
    path: '',
    component:RejectedByReviewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RejectedByReviewerRoutingModule { }

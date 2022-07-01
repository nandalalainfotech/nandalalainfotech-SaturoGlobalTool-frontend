import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewerViewComponent } from './reviewer-view.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewerViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerViewRoutingModule { }

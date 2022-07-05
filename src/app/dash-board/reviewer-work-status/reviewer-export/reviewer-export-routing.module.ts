import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewerExportComponent } from './reviewer-export.component';

const routes: Routes = [
  {
    path:'',
    component:ReviewerExportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewerExportRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssayComponent } from './assay.component';

const routes: Routes = [
  {
    path: "",
    component: AssayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssayRoutingModule { }

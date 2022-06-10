import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LigandComponent } from './ligand.component';

const routes: Routes = [
  {
    path: '',
    component: LigandComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LigandRoutingModule { }

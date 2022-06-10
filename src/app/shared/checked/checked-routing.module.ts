import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LigandComponent } from 'src/app/dash-board/ligand/ligand.component';
import { CheckedComponent } from './checked.component';

const routes: Routes = [
  {
    path: '',
    component: CheckedComponent,
  },
  {
    path: 'app-ligand',
    component: LigandComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckedRoutingModule { }

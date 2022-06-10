import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationSettingComponent } from './application-setting.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationSettingRoutingModule { }

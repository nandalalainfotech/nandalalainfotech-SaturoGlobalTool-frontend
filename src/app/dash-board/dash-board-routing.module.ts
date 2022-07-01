import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchSettingComponent } from '../dashboard/search-setting/search-setting.component';
import { DashBoardComponent } from './dash-board.component';

const routes: Routes = [
  {
    path: "",
    component: DashBoardComponent,
    children: [
      
      
      {
        path: 'app-setting',
        loadChildren: () => import("./setting/setting.module").then(m => m.SettingModule)
      },
      {
        path: 'app-ligand',
        loadChildren: () => import("./ligand/ligand.module").then(m => m.LigandModule)
      },
      {
        path: 'app-target',
        loadChildren: () => import("./target/target.module").then(m => m.TargetModule)
      },
      {
        path: 'app-assay',
        loadChildren: () => import("./assay/assay.module").then(m => m.AssayModule)
      },
      {
        path: 'app-measurement',
        loadChildren: () => import("./measurement/measurement.module").then(m => m.MeasurementModule)
      },
      {
        path: 'app-stepper',
        loadChildren: () => import("./stepper/stepper.module").then(m => m.StepperModule)
      },
      {
        path: 'app-admin',
        loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
      },
      {
        path: 'app-master',
        loadChildren: () => import("./master/master.module").then(m => m.MasterModule)
      },
      {
        path: 'app-status',
        loadChildren: () => import("./status/status.module").then(m => m.StatusModule)
      },
      {
        path: 'app-my-work',
        loadChildren: () => import("./my-work/my-work.module").then(m => m.MyWorkModule)
      },

      {
        path: 'app-reviewer-work-status',
        loadChildren: () => import("./reviewer-work-status/reviewer-work-status.module").then(m => m.ReviewerWorkStatusModule)
      },

      {
        path: 'app-search-setting',
        // loadChildren: () => import("./master/master.module").then(m => m.MasterModule)
        component: SearchSettingComponent,
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

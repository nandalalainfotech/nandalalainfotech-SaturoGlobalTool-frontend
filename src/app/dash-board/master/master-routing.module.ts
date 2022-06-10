import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssayTypeComponent } from './assay-type/assay-type.component';
import { BioSystemTypesComponent } from './bio-system-types/bio-system-types.component';
import { CategoryFunctionsComponent } from './category-functions/category-functions.component';
import { CategoryComponent } from './category/category.component';
import { LigandDoseHvalueComponent } from './ligand-dose-hvalue/ligand-dose-hvalue.component';
import { LigandDoseLvalueComponent } from './ligand-dose-lvalue/ligand-dose-lvalue.component';
import { LigandDoseSvalueComponent } from './ligand-dose-svalue/ligand-dose-svalue.component';
import { LigandTypeComponent } from './ligand-type/ligand-type.component';
import { LigandVersionComponent } from './ligand-version/ligand-version.component';
import { MasterComponent } from './master.component';
import { OriginalPrefixComponent } from './original-prefix/original-prefix.component';
import { RouteOfAdministrationTypeComponent } from './route-of-administration-type/route-of-administration-type.component';
import { ToxicityTypeComponent } from './toxicity-type/toxicity-type.component';
import { UnitLvalueComponent } from './unit-lvalue/unit-lvalue.component';
import { UnitSvalueComponent } from './unit-svalue/unit-svalue.component';

const routes: Routes = [{
  path: "",
  component: MasterComponent,

  children: [
    {
      path: "app-ligand-version",
      component: LigandVersionComponent
    },
    {
      path: "app-ligand-type",
      component: LigandTypeComponent
    },
    {
      path: "app-assay-type",
      component: AssayTypeComponent
    },
    {
      path: "app-toxicity-type",
      component: ToxicityTypeComponent
    },
    {
      path: "app-route-of-administration-type",
      component: RouteOfAdministrationTypeComponent
    },
    {
      path: "app-ligand-dose-svalue",
      component: LigandDoseSvalueComponent
    },
    {
      path: "app-ligand-dose-hvalue",
      component: LigandDoseHvalueComponent
    },
    {
      path: "app-ligand-dose-lvalue",
      component: LigandDoseLvalueComponent
    },
    {
      path: "app-unit-svalue",
      component: UnitSvalueComponent
    },
   
    {
      path: "app-unit-lvalue",
      component: UnitLvalueComponent
    },
    {
      path: "app-category",
      component: CategoryComponent
    },
    {
      path: "app-category-functions",
      component: CategoryFunctionsComponent
    },
    {
      path: "app-original-prefix",
      component: OriginalPrefixComponent
    },
    {
      path: "app-bio-system-types",
      component: BioSystemTypesComponent
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }

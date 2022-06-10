import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { LigandVersionComponent } from './ligand-version/ligand-version.component';
import { LigandTypeComponent } from './ligand-type/ligand-type.component';
import { AssayTypeComponent } from './assay-type/assay-type.component';
import { ToxicityTypeComponent } from './toxicity-type/toxicity-type.component';
import { RouteOfAdministrationTypeComponent } from './route-of-administration-type/route-of-administration-type.component';
import { LigandDoseSvalueComponent } from './ligand-dose-svalue/ligand-dose-svalue.component';
import { LigandDoseHvalueComponent } from './ligand-dose-hvalue/ligand-dose-hvalue.component';
import { LigandDoseLvalueComponent } from './ligand-dose-lvalue/ligand-dose-lvalue.component';
import { UnitSvalueComponent } from './unit-svalue/unit-svalue.component';
import { UnitLvalueComponent } from './unit-lvalue/unit-lvalue.component';
import { CategoryComponent } from './category/category.component';
import { CategoryFunctionsComponent } from './category-functions/category-functions.component';
import { OriginalPrefixComponent } from './original-prefix/original-prefix.component';
import { BioSystemTypesComponent } from './bio-system-types/bio-system-types.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { MasterComponent } from './master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { LigandVersionManager } from 'src/app/shared/services/restcontroller/bizservice/ligandVersion.service';
import { LigandTypeManager } from 'src/app/shared/services/restcontroller/bizservice/ligandType.service';
import { AssayTypeManager } from 'src/app/shared/services/restcontroller/bizservice/assayType.service';
import { ToxicityManager } from 'src/app/shared/services/restcontroller/bizservice/toxiCity.service';
import { RouteofAdminManager } from 'src/app/shared/services/restcontroller/bizservice/routeOfAdministration.service';
import { CategoryManager } from 'src/app/shared/services/restcontroller/bizservice/category.service';
import { CategoryfunctionManager } from 'src/app/shared/services/restcontroller/bizservice/categoryFunction.service';
import { OriginalprefixManager } from 'src/app/shared/services/restcontroller/bizservice/originalPrefix.service';
import { BioTypeManager } from 'src/app/shared/services/restcontroller/bizservice/type.service';
import { GenderComponent } from './gender/gender.component';



@NgModule({
  declarations: [MasterComponent,
    LigandVersionComponent,
    LigandTypeComponent,
    AssayTypeComponent,
    ToxicityTypeComponent,
    RouteOfAdministrationTypeComponent,
    LigandDoseSvalueComponent,
    LigandDoseHvalueComponent,
    LigandDoseLvalueComponent,
    UnitSvalueComponent,
    UnitLvalueComponent,
    CategoryComponent,
    CategoryFunctionsComponent,
    OriginalPrefixComponent,
    BioSystemTypesComponent,
    GenderComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [LigandVersionManager,
    LigandTypeManager,AssayTypeManager,
    ToxicityManager,RouteofAdminManager,
    CategoryManager,CategoryfunctionManager,OriginalprefixManager,BioTypeManager
  ]
})
export class MasterModule { }

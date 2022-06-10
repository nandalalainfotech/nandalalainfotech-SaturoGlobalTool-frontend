import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssayRoutingModule } from './assay-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AgGridModule } from 'ag-grid-angular';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { AssayTypeManager } from 'src/app/shared/services/restcontroller/bizservice/assayType.service';
import { ToxicityManager } from 'src/app/shared/services/restcontroller/bizservice/toxiCity.service';
import { RouteofAdminManager } from 'src/app/shared/services/restcontroller/bizservice/routeOfAdministration.service';
import { UnitSingleValueManager } from 'src/app/shared/services/restcontroller/bizservice/unitSingleValue.service';
import { UnitlowendvalueManager } from 'src/app/shared/services/restcontroller/bizservice/Unitlowendvalue.service';
import { LigandVersionManager } from 'src/app/shared/services/restcontroller/bizservice/ligandVersion.service';
import { CategoryManager } from 'src/app/shared/services/restcontroller/bizservice/category.service';
import { CategoryfunctionManager } from 'src/app/shared/services/restcontroller/bizservice/categoryFunction.service';
import { OriginalprefixManager } from 'src/app/shared/services/restcontroller/bizservice/originalPrefix.service';
import { BioTypeManager } from 'src/app/shared/services/restcontroller/bizservice/type.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AssayRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    ],
  providers: [AssayManager,
    LigandManager,
    AssayTypeManager,
    ToxicityManager,
    RouteofAdminManager,
    UnitSingleValueManager,
    UnitlowendvalueManager,
    LigandVersionManager,
    CategoryManager,CategoryfunctionManager,OriginalprefixManager,BioTypeManager]
})
export class AssayModule { }

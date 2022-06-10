import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { LigandTypeManager } from 'src/app/shared/services/restcontroller/bizservice/ligandType.service';
import { LigandVersionManager } from 'src/app/shared/services/restcontroller/bizservice/ligandVersion.service';
import { LigandRoutingModule } from './ligand-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LigandRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [LigandManager,LigandVersionManager,LigandTypeManager]
})
export class LigandModule { }

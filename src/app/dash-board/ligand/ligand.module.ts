import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { LigandTypeManager } from 'src/app/shared/services/restcontroller/bizservice/ligandType.service';
import { LigandVersionManager } from 'src/app/shared/services/restcontroller/bizservice/ligandVersion.service';
import { TaskAllocationManager } from 'src/app/shared/services/restcontroller/bizservice/taskAllocation.service';
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
  providers: [LigandManager,LigandVersionManager,LigandTypeManager,TaskAllocationManager,AssayManager]
})
export class LigandModule { }

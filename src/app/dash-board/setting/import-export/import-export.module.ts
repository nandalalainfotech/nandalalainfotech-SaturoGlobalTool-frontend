import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportExportRoutingModule } from './import-export-routing.module';
import { ImportExportComponent } from './import-export.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [ ImportExportComponent ],
  imports: [
    CommonModule,
    ImportExportRoutingModule,
    BreadcrumbModule
  ]
})
export class ImportExportModule { }

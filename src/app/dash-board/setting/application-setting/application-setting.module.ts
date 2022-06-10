import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { ApplicationSettingRoutingModule } from './application-setting-routing.module';
import { ApplicationSettingComponent } from './application-setting.component';


@NgModule({
  declarations: [ApplicationSettingComponent],
  imports: [
    CommonModule,
    ApplicationSettingRoutingModule,
    BreadcrumbModule,
    NgxFileDropModule
  ]
})
export class ApplicationSettingModule { }

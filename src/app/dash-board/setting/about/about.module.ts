import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [ AboutComponent ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    BreadcrumbModule
  ]
})
export class AboutModule { }

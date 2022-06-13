import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonRendererComponent } from '../renderercomponent/button-renderer-component';
import { LinkRendererComponent } from '../renderercomponent/link-renderer-component';
import { IconRendererComponent } from '../renderercomponent/icon-renderer-component';



@NgModule({
  declarations: [ ButtonRendererComponent,LinkRendererComponent ],
  imports: [
    CommonModule,
  ]
})
export class AgrenderercomponentModule { }

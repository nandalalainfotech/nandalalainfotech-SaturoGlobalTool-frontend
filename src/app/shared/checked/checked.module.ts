import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckedRoutingModule } from './checked-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ColorPickerModule } from 'ngx-color-picker';
import { CheckedPopupComponent } from '../checked-popup/checked-popup.component';
import { InlineEditingModule } from '../inline-editing/inline-editing.module';


@NgModule({
  declarations: [
    CheckedPopupComponent
  ],
  imports: [
    CommonModule,
    CheckedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatTabsModule,
    ColorPickerModule,
    InlineEditingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class CheckedModule { }

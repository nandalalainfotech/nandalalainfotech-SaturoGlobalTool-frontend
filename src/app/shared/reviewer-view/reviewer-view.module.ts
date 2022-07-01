import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewerViewRoutingModule } from './reviewer-view-routing.module';
import { CheckedPopupComponent } from '../checked-popup/checked-popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ColorPickerModule } from 'ngx-color-picker';
import { InlineEditingModule } from '../inline-editing/inline-editing.module';


@NgModule({
  declarations: [
    CheckedPopupComponent
  ],
  imports: [
    CommonModule,
    ReviewerViewRoutingModule,
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
export class ReviewerViewModule { }

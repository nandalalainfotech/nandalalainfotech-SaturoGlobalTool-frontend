import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CdkTableModule } from '@angular/cdk/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ComboBoxInlineEditorComponent } from './combo-box-inline-editor.component';
import { TextInlineEditorComponent } from './text-inline-editor.component';
import { RichTextInlineEditorComponent } from './richtext-inline-editor.component';
import { MultiSelectComboBoxInlineEditorComponent } from './multi-select-combo-box-inline-editor.component';
import { InlineSelectEditorComponent } from './inline-select-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CdkTableModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
        HttpClientModule,
        TooltipModule
    ],
    declarations: [
        ComboBoxInlineEditorComponent,
        TextInlineEditorComponent,
        RichTextInlineEditorComponent,
        MultiSelectComboBoxInlineEditorComponent,
        InlineSelectEditorComponent,
    ],
    providers: [
        NgbActiveModal
    ],
    exports: [
        ComboBoxInlineEditorComponent,
        TextInlineEditorComponent,
        RichTextInlineEditorComponent,
        MultiSelectComboBoxInlineEditorComponent,
        InlineSelectEditorComponent,
    ],
    entryComponents: [],
})
export class InlineEditingModule { }
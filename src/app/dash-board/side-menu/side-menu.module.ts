import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserModule,
        MatMenuModule,
        NgbModule,
        BrowserAnimationsModule
    ],
    exports: [],
    providers: [],
    bootstrap: []
})
export class SideMenuModule { }

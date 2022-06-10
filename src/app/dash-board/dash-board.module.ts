import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { LineChartModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { AgGridModule } from 'ag-grid-angular';
import { NgStepperModule } from 'angular-ng-stepper';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ColorPickerModule } from 'ngx-color-picker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { appSettingManager } from '../shared/services/restcontroller/bizservice/app-settings.service';
import { AssayManager } from '../shared/services/restcontroller/bizservice/Assay.service';
import { AssayTypeManager } from '../shared/services/restcontroller/bizservice/assayType.service';

import { CategoryManager } from '../shared/services/restcontroller/bizservice/category.service';
import { CategoryfunctionManager } from '../shared/services/restcontroller/bizservice/categoryFunction.service';

import { LigandManager } from '../shared/services/restcontroller/bizservice/ligandManager.service';
import { LigandTypeManager } from '../shared/services/restcontroller/bizservice/ligandType.service';
import { LigandVersionManager } from '../shared/services/restcontroller/bizservice/ligandVersion.service';
import { MeasurementManager } from '../shared/services/restcontroller/bizservice/Measurement.service';
import { RouteofAdminManager } from '../shared/services/restcontroller/bizservice/routeOfAdministration.service';
import { ToxicityManager } from '../shared/services/restcontroller/bizservice/toxiCity.service';
import { OriginalprefixManager } from '../shared/services/restcontroller/bizservice/originalPrefix.service';
import { BioTypeManager } from '../shared/services/restcontroller/bizservice/type.service';
import { UnitlowendvalueManager } from '../shared/services/restcontroller/bizservice/Unitlowendvalue.service';
import { UnitSingleValueManager } from '../shared/services/restcontroller/bizservice/unitSingleValue.service';
import { UserManager } from '../shared/services/restcontroller/bizservice/user.service';
import { DataSharedService } from '../shared/services/services/datashared.service';
import { AssayComponent } from './assay/assay.component';
import { DashboardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LigandComponent } from './ligand/ligand.component';
import { MeasurementComponent } from './measurement/measurement.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { StepperComponent } from './stepper/stepper.component';
import { TargetComponent } from './target/target.component';
import { ReportComponent } from './report/report.component';
import { LigandReportsManager } from '../shared/services/restcontroller/bizservice/report.service';
import { AdminComponent } from './admin/admin.component';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { StatusComponent } from './status/status.component';
// import { GoJsChartComponent } from './body/go-js-chart/go-js-chart.component';


// import {NgxCumulioComponent} from 'ngx-cumulio';


@NgModule({

    declarations: [
        DashBoardComponent,
        HeaderComponent,
        FooterComponent,
        SideMenuComponent,
        LigandComponent,
        TargetComponent,
        AssayComponent,
        MeasurementComponent,
        StepperComponent,
        ReportComponent,
        AdminComponent,
        StatusComponent,
        // BreadcrumbComponent
        // MasterComponent,
        // RadarChartComponent,
        // ModernChartComponent,
        //  GoJsChartComponent



        // NgxCumulioComponent,
    ],

    imports: [
        FormsModule,
        // BarChartModule,
        LineChartModule,
        NgxChartsModule,
        ChartsModule,
        NgApexchartsModule,
        // D3Module, 
        // MatDividerModule,
        // MatToolbarModule,
        PerfectScrollbarModule,
        ProgressbarModule.forRoot(),
        RoundProgressModule,
        TranslateModule.forRoot(),
        AgGridModule.withComponents([]),
        MatMenuModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        ColorPickerModule,
        DashboardRoutingModule,
        CdkStepperModule,
        NgStepperModule,
        BreadcrumbModule
    ],
    providers: [DataSharedService,
        appSettingManager,
        UserManager,
        LigandManager,
        LigandVersionManager,
        LigandTypeManager,
        AssayManager,
        MeasurementManager,
        UnitSingleValueManager,
        UnitlowendvalueManager,
        AssayTypeManager,
        ToxicityManager,
        RouteofAdminManager,
        CategoryManager,
        CategoryfunctionManager,
        OriginalprefixManager,
        BioTypeManager,
        LigandReportsManager

    ],
    exports: [NgbCollapseModule],
})
export class DashboardModule { }


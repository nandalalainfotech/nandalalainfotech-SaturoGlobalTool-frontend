import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { NgStepperModule } from 'angular-ng-stepper';
import { GojsAngularModule } from 'gojs-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchSettingComponent } from './dashboard/search-setting/search-setting.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AssayCheckedComponent } from './shared/assay-checked/assay-checked.component';
import { AuditComponent } from './shared/audit/audit.component';
import { CheckedPopupComponent } from './shared/checked-popup/checked-popup.component';
import { CheckedComponent } from './shared/checked/checked.component';
import { ConformationComponent } from './shared/conformation/conformation.component';
import { InlineEditingModule } from './shared/inline-editing/inline-editing.module';
import { MeasurementCheckedComponent } from './shared/measurement-checked/measurement-checked.component';
import { PopupComponent } from './shared/popup/popup.component';
import { CalloutComponent } from './shared/services/callout/callout.component';
import { IconRendererComponent } from './shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from './shared/services/restcontroller/bizservice/auth-manager.service';
import { RoleManager } from './shared/services/restcontroller/bizservice/role.service';
import { UserManager } from './shared/services/restcontroller/bizservice/user.service';
import { BaseService } from './shared/services/services/base.service';
import { CalloutService } from './shared/services/services/callout.service';
import { DataSharedService } from './shared/services/services/datashared.service';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserRegistrationModule } from './user-registration/user-registration.module';
import { JwtInterceptor } from './_helpers';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ReviewerViewComponent } from './shared/reviewer-view/reviewer-view.component';
import { ToxicityTypePopupComponent } from './shared/toxicity-type-popup/toxicity-type-popup.component';
import { CategoryFunctionPopupComponent } from './shared/category-function-popup/category-function-popup.component';
import { OriginalPrefixPopupComponent } from './shared/original-prefix-popup/original-prefix-popup.component';
import { LigandDoseSingleunitPopupComponent } from './shared/ligand-dose-singleunit-popup/ligand-dose-singleunit-popup.component';
import { LigandDoseHighlowunitPopupComponent } from './shared/ligand-dose-highlowunit-popup/ligand-dose-highlowunit-popup.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		CalloutComponent,
		PopupComponent,
		ResetPasswordComponent,
		AuditComponent,
		UserRegistrationComponent,
		ConformationComponent,
		IconRendererComponent,
		CheckedPopupComponent,
		CheckedComponent,
		AssayCheckedComponent,
		MeasurementCheckedComponent,
		SearchSettingComponent,
		ReviewerViewComponent,
		ToxicityTypePopupComponent,
		CategoryFunctionPopupComponent,
		OriginalPrefixPopupComponent,
		LigandDoseSingleunitPopupComponent,
		LigandDoseHighlowunitPopupComponent
	],
	imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		NgbModule,
		AgGridModule.withComponents([]),
		NgbCollapseModule,
		UserRegistrationModule,
		GojsAngularModule,
		CdkStepperModule,
        NgStepperModule,
		InlineEditingModule,
	],
	exports: [PopupComponent, NgbCollapseModule],
	providers: [AuthManager, CalloutService, DataSharedService,BaseService, UserManager,RoleManager,
		{ provide: LocationStrategy, useClass: PathLocationStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
	bootstrap: [AppComponent],
	entryComponents: [ResetPasswordComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }

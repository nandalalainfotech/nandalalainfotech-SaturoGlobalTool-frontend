import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { UsernameComponent } from './username/username.component';
import { PasswordComponent } from './password/password.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProfileComponent } from './profile.component';
import { AgGridModule } from 'ag-grid-angular';
import { BreadcrumbModule } from '../../breadcrumb/breadcrumb.module';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { PersonManager } from 'src/app/shared/services/restcontroller/bizservice/person.service';
import { RoleManager } from 'src/app/shared/services/restcontroller/bizservice/role.service';


@NgModule({
  declarations: [
    ProfileComponent,
    UsernameComponent,
    PasswordComponent,
    RegistrationComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    MatTabsModule,
    FlexLayoutModule,
    MatSidenavModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    UserManager,
    AuthManager,
    PersonManager,
    RoleManager
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ProfileModule { }

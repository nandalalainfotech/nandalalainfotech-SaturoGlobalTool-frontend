import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';

const routes: Routes = [
    {
        path: "",
        component: SettingComponent,
        children: [
            {
                path: 'app-profile',
                loadChildren: () => import("./profile/profile.module").then(m => m.ProfileModule)
            },
            {
                path: 'app-settings',
                loadChildren: () => import("./settings/settings.module").then(m => m.SettingsModule)
            },
            {
                path: 'app-about',
                loadChildren: () => import("./about/about.module").then(m => m.AboutModule)
            },
            {
                path: 'app-import-export',
                loadChildren: () => import("./import-export/import-export.module").then(m => m.ImportExportModule)
            },
            {
                path: 'app-user-theme',
                loadChildren: () => import("./user-theme/user-theme.module").then(m => m.UserThemeModule)
            },
            {
                path: 'app-application-setting',
                loadChildren: () => import("./application-setting/application-setting.module").then(m => m.ApplicationSettingModule)
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule { }

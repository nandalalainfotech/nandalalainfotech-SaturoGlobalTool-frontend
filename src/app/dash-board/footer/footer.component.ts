import {
    Component,
    EventEmitter,
    HostBinding,
    OnInit,
    Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { RoleManager } from 'src/app/shared/services/restcontroller/bizservice/role.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { Role001mb } from 'src/app/shared/services/restcontroller/entities/Role001mb';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { BaseService } from 'src/app/shared/services/services/base.service';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
    @Output() open: EventEmitter<boolean> = new EventEmitter();
    isOpen: boolean = false;
    parentMenuString: string = '';
    childMenuString: string = '';
    isActive: boolean | undefined;
    user?: User001mb;
    themes: any;
    // rgbToHex: any;
    // hexToRgb: any;
    user001mb: User001mb = new User001mb();
    roles: Role001mb[] = [];
    color: any;
    clr = 'black';
    defaultTheme: string = '#286090';
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    constructor(
        private router: Router,
        private userManager: UserManager,
        private calloutService: CalloutService,
        private authManager: AuthManager,
        private dataSharedService: DataSharedService,
        private authManger: AuthManager,
        private baseService: BaseService,
        private roleManager: RoleManager,
    ) {}

    ngOnInit() {
        this.user = this.authManger.getcurrentUser;
        // this.colorthemes = this.user.theme;
        this.dataSharedService.currentMenuObject.subscribe((object: any) => {
            this.parentMenuString = object.parentMenuString;
            this.childMenuString = object.childMenuString;
        });
        this.authManager.currentUserSubject.subscribe((object: any) => {
            this.user = object;
            
            let rgb = Utils.hexToRgb(object.theme);

            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });
    }
}

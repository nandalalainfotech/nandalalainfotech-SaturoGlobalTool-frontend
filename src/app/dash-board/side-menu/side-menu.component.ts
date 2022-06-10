import { transition, trigger, useAnimation } from '@angular/animations';
import {
    Component,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { DataSharedService } from 'src/app/shared/services/services/datashared.service';
import { SidebarCloseAnimation, SidebarOpenAnimation } from './animations';
import { Utils } from 'src/app/shared/utils/utils';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
const animationParams = {
    menuWidth: '70px',
    animationStyle: '1500ms linear',
};
@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.css'],
    animations: [
        trigger('sideMenu', [
            transition(':enter', [
                useAnimation(SidebarOpenAnimation, {
                    params: {
                        ...animationParams,
                    },
                }),
            ]),
            transition(':leave', [
                useAnimation(SidebarCloseAnimation, {
                    params: {
                        ...animationParams,
                    },
                }),
            ]),
        ]),
    ],
})
export class SideMenuComponent implements OnChanges, OnInit {
    @ViewChild('sidenav') public sidenav!: MatSidenav;
    @Input() openNav: boolean | undefined;
    private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);
    isCollapsed: boolean = true;
    smallScreen: boolean = true;
    sideNavMode: string | undefined;
    navMode: string | undefined;
    disableClose: boolean | undefined;
    screenWidth!: number;
    parentMenuString: string = '';
    childMenuString: string = '';
    temporaryDisabled: boolean = true;
    isShow: boolean = true;
    rolename?: string = "";
    user?: User001mb;
    hexToRgb: any;
    rgbToHex: any;
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    toggle() {
        this.temporaryDisabled = true;
        this.sidenav.toggle();
        setTimeout(() => {
            this.temporaryDisabled = false;
        }, 10);
    }
    constructor(
        private dataSharedService: DataSharedService,
        private authManager: AuthManager,
        private calloutService: CalloutService,
        private router: Router,
        private authManger: AuthManager
    ) { }
    @HostListener('window:resize', ['$event'])
    onResize(_event: any) {
        this.configureSideNav();
    }
    configureSideNav() {
        // this.smallScreen = window.innerWidth < 641 ? true : false;
        // if (!this.smallScreen) {
        //     this.sidenav.mode = "side"
        //     this.sidenav.opened = true
        // }
        // else {
        //     this.sidenav.mode = 'over'
        //     this.sidenav.opened = false
        // }
    }
    closeAllSidenav() {
        this.sidenav.close();
    }
    ngOnChanges() {
        // this.isCollapsed = false;
        // if (!this.openNav) {
        //  this.sidenav.open();
        // }
        // else if (this.sidenav) {
        //  this.sidenav.close();
        // }
    }
    ngOnInit() {
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
        //Getting Width size//
        this.screenWidth$.subscribe((width) => {
            this.screenWidth = width;
        });
        this.dataSharedService.currentSideNavObject.subscribe(
            (isShow: boolean) => {
                isShow = isShow;
                if (this.sidenav && !isShow) {
                    this.sidenav.open();
                } else if (this.sidenav) {
                    this.sidenav.close();
                }
            }
        );
        this.authManager.currentUserSubject.subscribe((object: any) => {
            // this.colorthemes = object.theme;
        });
    }

    ngAfterViewInit() {
        this.temporaryDisabled = false;
    }

    onMenuParentClick(parentMenuString: string, childMenuString: string = '') {
        this.parentMenuString = parentMenuString;
        this.childMenuString = childMenuString;
        let object: any = new Object();
        object.parentMenuString = this.parentMenuString;
        object.childMenuString = '';
        this.dataSharedService.changeMenuAction(object);
    }
    onMenuChildClick(parentMenuString: string, childMenuString: string) {
        this.parentMenuString = parentMenuString;
        this.childMenuString = childMenuString;
        let object: any = new Object();
        object.parentMenuString = this.parentMenuString;
        object.childMenuString = this.childMenuString;
        this.dataSharedService.changeMenuAction(object);
    }
    onClick(event: any) {
        this.isShow = !this.isShow;
    }
}

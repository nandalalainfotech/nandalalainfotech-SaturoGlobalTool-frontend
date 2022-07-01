import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportComponent } from 'src/app/dash-board/report/report.component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { Ligand001wb } from '../services/restcontroller/entities/Ligand001wb';
import { CalloutService } from '../services/services/callout.service';
import { Utils } from '../utils/utils';

@Component({
    selector: 'app-checked-popup',
    templateUrl: './checked-popup.component.html',
    styleUrls: ['./checked-popup.component.css']
})
export class CheckedPopupComponent implements OnInit {
    // public CheckedForm: FormGroup | any;
    @Input() CheckedForm: number | any;

    headerText: string = "";
    ligand: Ligand001wb[] = [];

    @Input() title: string = 'REVIEWER VIEW POPUP';
    @Input() addLabel: string = 'Add New';
    @Input() acceptLabel: string = 'Ok';
    @Input() cancelLabel: string = 'Close';

    @Input() showMenu: boolean = true;
    @Input() showAccept: boolean = true;
    @Input() showAdd: boolean = false;
    @Input() showCancel: boolean = true;
    @Input() preventCancel: boolean = false;

    @Output() addClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() cancelClick: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() acceptClick: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() SerchButtonClick: EventEmitter<any> = new EventEmitter<any>();

    @Input() noRecordMessage: string = 'No records found.';
    @Input() showNoRecordMessage: boolean = false;

    @Input() showPrint: boolean = false;
    @Input() showResize: boolean = false;
    @Input() showClose: boolean = false;

    @Input() enableAdd: boolean = false;

    @Input() heightArg: number = 300;
    @Input() widthArg: number = 300;

    @Input() acceptIcon: string = 'fa fa-check';

    @Input() showDefultFooter: boolean = true;

    @Input() bodyStyleClass: string = '';

    hexToRgb: any;
    rgbToHex: any;
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    constructor(
        public activeModal: NgbActiveModal,
        private authManager: AuthManager,
        private modalService: NgbModal,
        private router: Router,
        private calloutService: CalloutService
    ) { }
    ngOnInit() {

        this.authManager.currentUserSubject.subscribe((object: any) => {
            let rgb = Utils.hexToRgb(object.theme);

            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });
    }
    onCrossClick(event: any) {
        if (!this.preventCancel) {
            event.stopPropagation();
            this.activeModal.close('Cross click');
        } else {
            this.cancelClick.emit(true);
        }
    }

    onCloseClick(event: any) {
        if (!this.preventCancel) {
            event.stopPropagation();
            this.activeModal.close('No');
        }
        this.cancelClick.emit(true);
    }

    onAcceptClick(event: any) {


        // if (event.isTrusted) {

        // }
        // this.router.navigate(['/app-report'])'
        this.activeModal.close('Yes');
        // this.cancelClick.emit(true);
        // this.calloutService.showSuccess("Ligand Accepted Successfully");

    }
    onAddClick(event: any) {
        this.addClick.emit(event);
    }

}

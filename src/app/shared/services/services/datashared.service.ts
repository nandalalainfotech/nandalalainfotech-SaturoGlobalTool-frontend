import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharedService {


	private objectSource = new BehaviorSubject<Object>(Object);
	private isLoadIcon = new BehaviorSubject<boolean>(false);
	private isSideNavShow = new BehaviorSubject<boolean>(false);

	currentMenuObject = this.objectSource.asObservable();
	currentLoaderObject = this.isLoadIcon.asObservable();
	currentSideNavObject = this.isSideNavShow.asObservable();

	parentMenuString: any;
	childMenuString: any;
	constructor() {
		this.parentMenuString = sessionStorage.getItem('parentMenuString');
		this.childMenuString = sessionStorage.getItem('childMenuString');
		let object: any = new Object();
		object.parentMenuString = this.parentMenuString;
		object.childMenuString = this.childMenuString;
		this.objectSource.next(object);
	}

	changeMenuAction(object: any) {
		if (object) {
			sessionStorage.setItem('parentMenuString', object.parentMenuString);
			sessionStorage.setItem('childMenuString', object.childMenuString);
			this.objectSource.next(object);
		} else {
			sessionStorage.clear();
			this.objectSource.next("");
		}
	}

	isShowsLoaderIcon(isLoader: boolean = false) {
		this.isLoadIcon.next(isLoader);
	}

	isSideNavAction(isShow: boolean = false) {
		this.isSideNavShow.next(isShow);
	}

	ngOnInit() {

	}


}
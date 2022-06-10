import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { User001mb } from 'src/app/shared/services/restcontroller/entities/User001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  rolename?: string = "";
  user?: User001mb;
  constructor(private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,) { }

  ngOnInit(): void {

    this.authManager.currentUserSubject.subscribe((object: any) => {
      this.user = object;
      
    });
  }

}

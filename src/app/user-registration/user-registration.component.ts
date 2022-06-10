import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { SystemPropertiesService } from 'src/app/shared/services/restcontroller/bizservice/system-properties.service';
import { Systemproperties001mb } from 'src/app/shared/services/restcontroller/entities/Systemproperties001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { PersonManager } from '../shared/services/restcontroller/bizservice/person.service';
import { UserManager } from '../shared/services/restcontroller/bizservice/user.service';
import { Person001mb } from '../shared/services/restcontroller/entities/Person001mb';
import { User001mb } from '../shared/services/restcontroller/entities/User001mb';


@Component({
    selector: 'app-user-registration',
    templateUrl: './user-registration.component.html',
    styleUrls: ['./user-registration.component.css']
})

export class UserRegistrationComponent implements OnInit {
    emailValidation: boolean = true;
    frameworkComponents: any;
    registerid: number | any;
    firstname: string = "";
    lastname: string = "";
    email: string = "";
    domain: string = "";
    username: string = "";
    securityquestion: string = "";
    message: string = "";
    securityanswer: string = "";
    status: string = "";
    insertUser: string = "";
    insertDatetime: Date | any;
    name: string = "Registration.SecurityQuestion";
    type: string = "SecurityQuestion";
    dname: string = "Login.Domain";
    dtype: string = "Domain";
    cname: string = "Register.status";
    ctype: string = "register";
    systemproperties?: Systemproperties001mb[] = [];
    dsystemproperties?: Systemproperties001mb[] = [];
    csystemproperties?: Systemproperties001mb[] = [];
    persons: Person001mb[] = [];
    public gridOptions: GridOptions | any;
    userRegisterForm: FormGroup | any;
    submitted = false;
    users: User001mb[] = [];
	// toggle1: boolean = false;
    // toggle2: boolean = false;
    constructor(private systemPropertiesService: SystemPropertiesService, private router: Router,
        private formBuilder: FormBuilder,
        private calloutService: CalloutService,
        private userManager: UserManager,
        private personManager: PersonManager,
        private authManager: AuthManager,
        private modalService: NgbModal) {
        this.frameworkComponents = {
            iconRenderer: IconRendererComponent
        }
    }

    ngOnInit() {
        this.userRegisterForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            securityquestion: ['', Validators.required],
            securityanswer: ['', Validators.required],
            email: ['', Validators.required],
            status: ['', Validators.required],
        });
       
        this.systemPropertiesService.system(this.name, this.type).subscribe(response => {
            this.systemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.dname, this.dtype).subscribe(response => {
            this.dsystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
        this.systemPropertiesService.system(this.cname, this.ctype).subscribe(response => {
            this.csystemproperties = deserialize<Systemproperties001mb[]>(Systemproperties001mb, response);
        });
    }


    get f() { return this.userRegisterForm.controls; }



    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control: any) => {
            control.markAsTouched();
            if (control.controls) {
                this.markFormGroupTouched(control);
            }
        });
    }

    onUserRegistrationClick(event: any, userRegisterForm: any) {
        this.markFormGroupTouched(this.userRegisterForm);
        this.submitted = true;
        if (this.userRegisterForm.invalid) {
            return;
        }
        // let registration001mb = new Registration001mb();
        // registration001mb.firstname = this.f.firstname.value ? this.f.firstname.value : "";
        // registration001mb.lastname = this.f.lastname.value ? this.f.lastname.value : "";
        // registration001mb.email = this.f.email.value ? this.f.email.value : "";
        // registration001mb.domain = "manufacturing"
        // registration001mb.username = this.f.email.value ? this.f.email.value : "";
        // registration001mb.securityquestion = "What was your childhood nickname ?"
        // registration001mb.message = "DemoRegistration"
        // registration001mb.securityanswer = "good"
        // registration001mb.status = "In Progress"
        // registration001mb.insertUser = "sekar";
        // registration001mb.insertDatetime = new Date();
        // this.registrationManager.saveuserregister(registration001mb).subscribe((response) => {
        //     this.calloutService.showSuccess(" User Registration is Successfull");
        //     if (response) {
        //         this.router.navigate(['/app-login']);
        //     }
// })
let user001mb = new User001mb();
user001mb.firstname = this.f.firstname.value ? this.f.firstname.value : "";
user001mb.lastname = this.f.lastname.value ? this.f.lastname.value : "";
user001mb.username = this.f.username.value ? this.f.username.value : "";
user001mb.status = "A";
user001mb.securityquestion = this.f.securityquestion.value ? this.f.securityquestion.value : "";
user001mb.securityanswer = this.f.securityanswer.value ? this.f.securityanswer.value : "";
user001mb.email = this.f.email.value ? this.f.email.value : "";
user001mb.insertUser = "siva";
user001mb.insertDatetime = new Date();
this.userManager.registerUser(user001mb).subscribe((response) => {
    this.calloutService.showSuccess("User Registered Successfully");
    this.userRegisterForm.reset();
    this.submitted = false;
})
    }

    // onReset() {
    //     this.submitted = false;
    //     this.registerForm.reset();
    // }


    // password code 
    // changeType(input_field_password: { type: string; }, num: number){
	// 	if(input_field_password.type=="password")
	// 	  input_field_password.type = "text";
	// 	else
	// 	  input_field_password.type = "password";
	
	// 	if(num == 1)
	// 	  this.toggle1 = !this.toggle1;
	// 	else
	// 	  this.toggle2 = !this.toggle2;
	//   }

      onBack() {
		this.router.navigate(['/app-login']);
	}

}
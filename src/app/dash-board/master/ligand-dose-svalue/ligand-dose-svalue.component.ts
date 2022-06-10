import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-ligand-dose-svalue',
  templateUrl: './ligand-dose-svalue.component.html',
  styleUrls: ['./ligand-dose-svalue.component.css']
})
export class LigandDoseSvalueComponent implements OnInit {

  public SinglevalueForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  ligandDoseSvalue: string = "";



  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.SinglevalueForm = this.formBuilder.group({


      ligandDoseSvalue: ['', Validators.required],

    });
  }


  get f() { return this.SinglevalueForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onSinglevalueClick(event: any, SinglevalueForm: any) {
    this.markFormGroupTouched(this.SinglevalueForm);
    this.submitted = true;
    if (this.SinglevalueForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.SinglevalueForm.reset();
  }
}

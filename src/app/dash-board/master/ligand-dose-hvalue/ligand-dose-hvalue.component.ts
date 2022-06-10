import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-ligand-dose-hvalue',
  templateUrl: './ligand-dose-hvalue.component.html',
  styleUrls: ['./ligand-dose-hvalue.component.css']
})
export class LigandDoseHvalueComponent implements OnInit {

  public HighendvalueForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  ligandDoseHvalue: string = "";

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.HighendvalueForm = this.formBuilder.group({
      ligandDoseSvalue: ['', Validators.required],
    });
  }


  get f() { return this.HighendvalueForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onHighendvalueClick(event: any, HighendvalueForm: any) {
    this.markFormGroupTouched(this.HighendvalueForm);
    this.submitted = true;
    if (this.HighendvalueForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.HighendvalueForm.reset();
  }

}

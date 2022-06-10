import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-ligand-dose-lvalue',
  templateUrl: './ligand-dose-lvalue.component.html',
  styleUrls: ['./ligand-dose-lvalue.component.css']
})
export class LigandDoseLvalueComponent implements OnInit {

  
  public LowendvalueForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  ligandDoseLvalue: string = "";

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;


  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.LowendvalueForm = this.formBuilder.group({
      ligandDoseLvalue: ['', Validators.required],
    });
  }


  get f() { return this.LowendvalueForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onLowendvalueClick(event: any, LowendvalueForm: any) {
    this.markFormGroupTouched(this.LowendvalueForm);
    this.submitted = true;
    if (this.LowendvalueForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.LowendvalueForm.reset();
  }
}

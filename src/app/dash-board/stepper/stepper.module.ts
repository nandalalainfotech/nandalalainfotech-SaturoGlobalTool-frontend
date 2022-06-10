import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StepperRoutingModule } from './stepper-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StepperRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CdkStepperModule,
    NgStepperModule
  ]
})
export class StepperModule { }

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedToQcComponent } from './submitted-to-qc.component';

describe('SubmittedToQcComponent', () => {
  let component: SubmittedToQcComponent;
  let fixture: ComponentFixture<SubmittedToQcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedToQcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedToQcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedPopupComponent } from './checked-popup.component';

describe('CheckedPopupComponent', () => {
  let component: CheckedPopupComponent;
  let fixture: ComponentFixture<CheckedPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckedPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

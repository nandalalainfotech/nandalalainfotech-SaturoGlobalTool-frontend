import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxicityTypePopupComponent } from './toxicity-type-popup.component';

describe('ToxicityTypePopupComponent', () => {
  let component: ToxicityTypePopupComponent;
  let fixture: ComponentFixture<ToxicityTypePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToxicityTypePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToxicityTypePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

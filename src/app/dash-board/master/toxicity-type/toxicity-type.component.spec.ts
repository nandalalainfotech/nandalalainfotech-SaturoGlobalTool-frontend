import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxicityTypeComponent } from './toxicity-type.component';

describe('ToxicityTypeComponent', () => {
  let component: ToxicityTypeComponent;
  let fixture: ComponentFixture<ToxicityTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToxicityTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToxicityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

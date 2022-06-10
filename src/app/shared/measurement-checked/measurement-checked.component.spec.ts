import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementCheckedComponent } from './measurement-checked.component';

describe('MeasurementCheckedComponent', () => {
  let component: MeasurementCheckedComponent;
  let fixture: ComponentFixture<MeasurementCheckedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementCheckedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementCheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

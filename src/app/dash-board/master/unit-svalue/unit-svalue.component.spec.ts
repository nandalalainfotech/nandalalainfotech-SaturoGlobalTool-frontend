import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitSvalueComponent } from './unit-svalue.component';

describe('UnitSvalueComponent', () => {
  let component: UnitSvalueComponent;
  let fixture: ComponentFixture<UnitSvalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitSvalueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitSvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

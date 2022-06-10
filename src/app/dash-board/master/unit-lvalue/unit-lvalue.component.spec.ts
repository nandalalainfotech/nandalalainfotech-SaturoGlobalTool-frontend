import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitLvalueComponent } from './unit-lvalue.component';

describe('UnitLvalueComponent', () => {
  let component: UnitLvalueComponent;
  let fixture: ComponentFixture<UnitLvalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitLvalueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitLvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

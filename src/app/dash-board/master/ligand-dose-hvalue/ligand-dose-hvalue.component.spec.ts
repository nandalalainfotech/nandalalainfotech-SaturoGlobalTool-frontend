import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandDoseHvalueComponent } from './ligand-dose-hvalue.component';

describe('LigandDoseHvalueComponent', () => {
  let component: LigandDoseHvalueComponent;
  let fixture: ComponentFixture<LigandDoseHvalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigandDoseHvalueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandDoseHvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

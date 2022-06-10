import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandDoseLvalueComponent } from './ligand-dose-lvalue.component';

describe('LigandDoseLvalueComponent', () => {
  let component: LigandDoseLvalueComponent;
  let fixture: ComponentFixture<LigandDoseLvalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigandDoseLvalueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandDoseLvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

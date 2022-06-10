import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandDoseSvalueComponent } from './ligand-dose-svalue.component';

describe('LigandDoseSvalueComponent', () => {
  let component: LigandDoseSvalueComponent;
  let fixture: ComponentFixture<LigandDoseSvalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigandDoseSvalueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandDoseSvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

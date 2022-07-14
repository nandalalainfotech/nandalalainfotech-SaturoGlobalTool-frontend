import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandDoseSingleunitPopupComponent } from './ligand-dose-singleunit-popup.component';

describe('LigandDoseSingleunitPopupComponent', () => {
  let component: LigandDoseSingleunitPopupComponent;
  let fixture: ComponentFixture<LigandDoseSingleunitPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigandDoseSingleunitPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandDoseSingleunitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandDoseHighlowunitPopupComponent } from './ligand-dose-highlowunit-popup.component';

describe('LigandDoseHighlowunitPopupComponent', () => {
  let component: LigandDoseHighlowunitPopupComponent;
  let fixture: ComponentFixture<LigandDoseHighlowunitPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigandDoseHighlowunitPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandDoseHighlowunitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

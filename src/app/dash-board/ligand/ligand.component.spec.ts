import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandComponent } from './ligand.component';

describe('LigandComponent', () => {
  let component: LigandComponent;
  let fixture: ComponentFixture<LigandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandVersionComponent } from './ligand-version.component';

describe('LigandVersionComponent', () => {
  let component: LigandVersionComponent;
  let fixture: ComponentFixture<LigandVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigandVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

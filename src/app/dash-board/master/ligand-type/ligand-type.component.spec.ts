import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigandTypeComponent } from './ligand-type.component';

describe('LigandTypeComponent', () => {
  let component: LigandTypeComponent;
  let fixture: ComponentFixture<LigandTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigandTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigandTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

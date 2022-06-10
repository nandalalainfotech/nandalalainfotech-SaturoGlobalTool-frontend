import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioSystemTypesComponent } from './bio-system-types.component';

describe('BioSystemTypesComponent', () => {
  let component: BioSystemTypesComponent;
  let fixture: ComponentFixture<BioSystemTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BioSystemTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BioSystemTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssayTypeComponent } from './assay-type.component';

describe('AssayTypeComponent', () => {
  let component: AssayTypeComponent;
  let fixture: ComponentFixture<AssayTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssayTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssayTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssayCheckedComponent } from './assay-checked.component';

describe('AssayCheckedComponent', () => {
  let component: AssayCheckedComponent;
  let fixture: ComponentFixture<AssayCheckedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssayCheckedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssayCheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

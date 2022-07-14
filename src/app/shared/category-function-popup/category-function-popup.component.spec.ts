import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFunctionPopupComponent } from './category-function-popup.component';

describe('CategoryFunctionPopupComponent', () => {
  let component: CategoryFunctionPopupComponent;
  let fixture: ComponentFixture<CategoryFunctionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryFunctionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFunctionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

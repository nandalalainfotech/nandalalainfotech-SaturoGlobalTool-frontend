import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFunctionsComponent } from './category-functions.component';

describe('CategoryFunctionsComponent', () => {
  let component: CategoryFunctionsComponent;
  let fixture: ComponentFixture<CategoryFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryFunctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

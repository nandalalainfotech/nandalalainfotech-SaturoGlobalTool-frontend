import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerViewComponent } from './reviewer-view.component';

describe('ReviewerViewComponent', () => {
  let component: ReviewerViewComponent;
  let fixture: ComponentFixture<ReviewerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

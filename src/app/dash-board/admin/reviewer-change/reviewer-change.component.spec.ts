import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerChangeComponent } from './reviewer-change.component';

describe('ReviewerChangeComponent', () => {
  let component: ReviewerChangeComponent;
  let fixture: ComponentFixture<ReviewerChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

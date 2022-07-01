import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerTaskComponent } from './reviewer-task.component';

describe('ReviewerTaskComponent', () => {
  let component: ReviewerTaskComponent;
  let fixture: ComponentFixture<ReviewerTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerCompletedTaskComponent } from './reviewer-completed-task.component';

describe('ReviewerCompletedTaskComponent', () => {
  let component: ReviewerCompletedTaskComponent;
  let fixture: ComponentFixture<ReviewerCompletedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerCompletedTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerCompletedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

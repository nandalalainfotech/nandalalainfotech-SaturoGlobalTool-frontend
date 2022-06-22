import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerInprocessTaskComponent } from './reviewer-inprocess-task.component';

describe('ReviewerInprocessTaskComponent', () => {
  let component: ReviewerInprocessTaskComponent;
  let fixture: ComponentFixture<ReviewerInprocessTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerInprocessTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerInprocessTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

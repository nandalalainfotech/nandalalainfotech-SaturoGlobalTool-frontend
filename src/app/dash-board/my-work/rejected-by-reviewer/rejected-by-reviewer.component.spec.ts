import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedByReviewerComponent } from './rejected-by-reviewer.component';

describe('RejectedByReviewerComponent', () => {
  let component: RejectedByReviewerComponent;
  let fixture: ComponentFixture<RejectedByReviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedByReviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedByReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

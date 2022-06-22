import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerWorkStatusComponent } from './reviewer-work-status.component';

describe('ReviewerWorkStatusComponent', () => {
  let component: ReviewerWorkStatusComponent;
  let fixture: ComponentFixture<ReviewerWorkStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerWorkStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerWorkStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

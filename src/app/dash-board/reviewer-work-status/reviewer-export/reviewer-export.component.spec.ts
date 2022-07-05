import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerExportComponent } from './reviewer-export.component';

describe('ReviewerExportComponent', () => {
  let component: ReviewerExportComponent;
  let fixture: ComponentFixture<ReviewerExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewerExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

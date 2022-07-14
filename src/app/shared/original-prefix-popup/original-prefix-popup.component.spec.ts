import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalPrefixPopupComponent } from './original-prefix-popup.component';

describe('OriginalPrefixPopupComponent', () => {
  let component: OriginalPrefixPopupComponent;
  let fixture: ComponentFixture<OriginalPrefixPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginalPrefixPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginalPrefixPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

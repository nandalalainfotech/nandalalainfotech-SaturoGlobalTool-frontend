import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginalPrefixComponent } from './original-prefix.component';

describe('OriginalPrefixComponent', () => {
  let component: OriginalPrefixComponent;
  let fixture: ComponentFixture<OriginalPrefixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginalPrefixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginalPrefixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

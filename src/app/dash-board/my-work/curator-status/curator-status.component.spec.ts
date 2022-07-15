import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuratorStatusComponent } from './curator-status.component';

describe('CuratorStatusComponent', () => {
  let component: CuratorStatusComponent;
  let fixture: ComponentFixture<CuratorStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuratorStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuratorStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

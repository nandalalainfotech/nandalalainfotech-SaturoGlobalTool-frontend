import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteOfAdministrationTypeComponent } from './route-of-administration-type.component';

describe('RouteOfAdministrationTypeComponent', () => {
  let component: RouteOfAdministrationTypeComponent;
  let fixture: ComponentFixture<RouteOfAdministrationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteOfAdministrationTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteOfAdministrationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

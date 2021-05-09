import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlightUpdateComponent } from './admin-flight-update.component';

describe('AdminFlightUpdateComponent', () => {
  let component: AdminFlightUpdateComponent;
  let fixture: ComponentFixture<AdminFlightUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFlightUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFlightUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

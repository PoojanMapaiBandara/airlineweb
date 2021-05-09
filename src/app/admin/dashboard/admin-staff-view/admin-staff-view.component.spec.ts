import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaffViewComponent } from './admin-staff-view.component';

describe('AdminStaffViewComponent', () => {
  let component: AdminStaffViewComponent;
  let fixture: ComponentFixture<AdminStaffViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStaffViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStaffViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateStaffComponent } from './admin-update-staff.component';

describe('AdminUpdateStaffComponent', () => {
  let component: AdminUpdateStaffComponent;
  let fixture: ComponentFixture<AdminUpdateStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

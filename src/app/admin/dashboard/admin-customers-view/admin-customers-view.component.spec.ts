import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomersViewComponent } from './admin-customers-view.component';

describe('AdminCustomersViewComponent', () => {
  let component: AdminCustomersViewComponent;
  let fixture: ComponentFixture<AdminCustomersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCustomersViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

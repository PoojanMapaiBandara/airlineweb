import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTicketViewComponent } from './admin-ticket-view.component';

describe('AdminTicketViewComponent', () => {
  let component: AdminTicketViewComponent;
  let fixture: ComponentFixture<AdminTicketViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTicketViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTicketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

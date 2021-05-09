import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReserveTicketsComponent } from './view-reserve-tickets.component';

describe('ViewReserveTicketsComponent', () => {
  let component: ViewReserveTicketsComponent;
  let fixture: ComponentFixture<ViewReserveTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReserveTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReserveTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {BookingService} from '../../../services/booking/booking.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {adminService} from '../../../services/auth/admin/admin.service';

declare let paypal;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  ticket: Object =  [];
tId = this.route.snapshot.paramMap.get('id');
tPrice = this.route.snapshot.paramMap.get('price');
  paidFor = false;
  constructor(private router: Router, private route: ActivatedRoute, private Book: BookingService, private Ticket: BookingService ) { }

  ngOnInit(): void {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: 'Flight Ticket Payment',
                amount: {
                  currency_code: 'USD',
                  value: this.tPrice
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.paidFor = true;
          this.onPayment();

        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
  onPayment() {
    const id = this.tId;
    const pay = "paid";
    this.Ticket.addPayment(id, pay).subscribe(resDate => {
        console.log(resDate);
      alert('Payment Success!!');
      this.router.navigate(['user-dashboard']);
      }
    );
  }
}

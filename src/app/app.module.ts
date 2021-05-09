import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DashboardTemplateComponent } from './user/dashboard/dashboard-template/dashboard-template.component';
import { AddCustomerDetailsComponent } from './user/dashboard/add-customer-details/add-customer-details.component';
import { UpdateCustomerDetailsComponent } from './user/dashboard/update-customer-details/update-customer-details.component';
import { MyTicketsComponent } from './user/dashboard/my-tickets/my-tickets.component';
import { TemplateComponent } from './staff/dashboard/template/template.component';
import { ViewReserveTicketsComponent } from './staff/dashboard/view-reserve-tickets/view-reserve-tickets.component';
import { ViewCustomersComponent } from './staff/dashboard/view-customers/view-customers.component';
import { ViewCustomerComponent } from './staff/dashboard/view-customers/view-customer/view-customer.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StaffLoginComponent } from './staff/staff-login/staff-login.component';
import { LandingBodyComponent } from './landing-page/landing-body/landing-body.component';
import { StaffRegisterComponent } from './staff/staff-register/staff-register.component';
import { SearchFlightComponent } from './user/dashboard/search-flight/search-flight.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { UpdateFlightComponent } from './staff/dashboard/flights/update-flight/update-flight.component';
import { AddFlightComponent } from './staff/dashboard/flights/add-flight/add-flight.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminCustomersViewComponent } from './admin/dashboard/admin-customers-view/admin-customers-view.component';
import { AdminCustomerUpdateComponent } from './admin/dashboard/admin-customers-view/admin-customer-update/admin-customer-update.component';
import { AdminFlightsComponent } from './admin/dashboard/admin-flights/admin-flights.component';
import { AdminFlightUpdateComponent } from './admin/dashboard/admin-flights/admin-flight-update/admin-flight-update.component';
import { AdminTicketViewComponent } from './admin/dashboard/admin-ticket-view/admin-ticket-view.component';
import { AdminStaffViewComponent } from './admin/dashboard/admin-staff-view/admin-staff-view.component';
import { AdminUpdateStaffComponent } from './admin/dashboard/admin-staff-view/admin-update-staff/admin-update-staff.component';
import { PaymentsComponent } from './user/dashboard/payments/payments.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    DashboardTemplateComponent,
    AddCustomerDetailsComponent,
    UpdateCustomerDetailsComponent,
    MyTicketsComponent,
    TemplateComponent,
    ViewReserveTicketsComponent,
    ViewCustomersComponent,
    ViewCustomerComponent,
    StaffLoginComponent,
    LandingBodyComponent,
    StaffRegisterComponent,
    SearchFlightComponent,
    UpdateFlightComponent,
    AddFlightComponent,
    AdminLoginComponent,
    AdminCustomersViewComponent,
    AdminCustomerUpdateComponent,
    AdminFlightsComponent,
    AdminFlightUpdateComponent,
    AdminTicketViewComponent,
    AdminStaffViewComponent,
    AdminUpdateStaffComponent,
    PaymentsComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

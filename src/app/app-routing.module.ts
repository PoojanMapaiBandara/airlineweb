import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  StaffLoginComponent  } from './staff/staff-login/staff-login.component';
import { LoginComponent } from './user/login/login.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import { RegisterComponent } from './user/register/register.component';
import { StaffRegisterComponent } from './staff/staff-register/staff-register.component';
import { DashboardTemplateComponent } from './user/dashboard/dashboard-template/dashboard-template.component';
import { SearchFlightComponent } from './user/dashboard/search-flight/search-flight.component';
import { UpdateCustomerDetailsComponent } from './user/dashboard/update-customer-details/update-customer-details.component';
import { MyTicketsComponent } from './user/dashboard/my-tickets/my-tickets.component';
import { AuthGuardService } from './services/auth/user/auth.guard';
import { FakeGuardService  as FakeGuard } from './services/auth/user/fake-guard';

// staff section
import { TemplateComponent } from './staff/dashboard/template/template.component';
import { FakeStaffGuardService  } from './services/auth/staff/fakeStaff.guard';
import { AuthGuardService as StaffAuthGuard  } from './services/auth/staff/staff.guard';
import { ViewReserveTicketsComponent } from './staff/dashboard/view-reserve-tickets/view-reserve-tickets.component';
import { ViewCustomersComponent } from './staff/dashboard/view-customers/view-customers.component';
import { ViewCustomerComponent } from './staff/dashboard/view-customers/view-customer/view-customer.component'; // single customer view
import { UpdateFlightComponent } from './staff/dashboard/flights/update-flight/update-flight.component';
import { AddFlightComponent } from './staff/dashboard/flights/add-flight/add-flight.component';

// Admin section
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminCustomersViewComponent } from './admin/dashboard/admin-customers-view/admin-customers-view.component';
import { AdminCustomerUpdateComponent } from './admin/dashboard/admin-customers-view/admin-customer-update/admin-customer-update.component';
import { AdminFlightsComponent } from './admin/dashboard/admin-flights/admin-flights.component';
import { AdminFlightUpdateComponent } from './admin/dashboard/admin-flights/admin-flight-update/admin-flight-update.component';
import { AdminTicketViewComponent } from './admin/dashboard/admin-ticket-view/admin-ticket-view.component';
import { AdminStaffViewComponent } from './admin/dashboard/admin-staff-view/admin-staff-view.component';
import { AdminUpdateStaffComponent } from './admin/dashboard/admin-staff-view/admin-update-staff/admin-update-staff.component';
import { AuthGuardService as AdminAuthGuard} from './services/auth/admin/admin.guard';
import { FakeAdminAuthGuardService } from './services/auth/admin/fakeAdmin.guard';
import { PaymentsComponent } from './user/dashboard/payments/payments.component';
const routes: Routes = [
  // user routes
  {path: '', redirectTo: '/landing-page', pathMatch: 'full'},
  {path: 'landing-page', component: LandingPageComponent},
  {path: 'userLogin', component:  LoginComponent, canActivate : [FakeGuard]},
  {path: 'user-signup', component: RegisterComponent, canActivate : [FakeGuard]},
  {path: 'user-dashboard', component: DashboardTemplateComponent, canActivate : [AuthGuardService] },
  {path: 'search-flight', component: SearchFlightComponent , canActivate : [AuthGuardService] },
  {path: 'user-profile', component: UpdateCustomerDetailsComponent, canActivate : [AuthGuardService]  },
  {path: 'user-tickets', component: MyTicketsComponent, canActivate : [AuthGuardService] },
  {path: 'user-tickets-payment/:id/:price', component: PaymentsComponent, canActivate : [AuthGuardService] },

  // staff routes
  {path: 'staff-dashboard', component: TemplateComponent, canActivate : [StaffAuthGuard] },
  {path: 'staff-signup', component: StaffRegisterComponent, canActivate : [FakeStaffGuardService]},
  {path: 'StaffL', redirectTo: '/StaffLogin'},
  {path: 'StaffLogin', component:  StaffLoginComponent, canActivate : [FakeStaffGuardService] },
  {path: 'staff-view-customer-bookings', component: ViewReserveTicketsComponent, canActivate : [StaffAuthGuard] },
  {path: 'staff-view-customers', component: ViewCustomersComponent, canActivate : [StaffAuthGuard] },
  {path: 'staff-view-customer/:email', component: ViewCustomerComponent, canActivate : [StaffAuthGuard] },
  {path: 'staff-update-flight/:id', component: UpdateFlightComponent, canActivate : [StaffAuthGuard] },
  {path: 'staff-add-flight', component: AddFlightComponent, canActivate : [StaffAuthGuard] },


  // admin routes
  {path: 'admin-login', component: AdminLoginComponent, canActivate : [FakeAdminAuthGuardService] },
  {path: 'admin-view-bookings', component:  AdminTicketViewComponent, canActivate : [AdminAuthGuard] },
  {path: 'admin-view-customers', component: AdminCustomersViewComponent, canActivate : [AdminAuthGuard] },
  {path: 'admin-view-customer/:email', component: AdminCustomerUpdateComponent, canActivate : [AdminAuthGuard] },
  {path: 'admin-view-flight', component: AdminFlightsComponent, canActivate : [AdminAuthGuard] },
  {path: 'admin-update-flight/:id', component: AdminFlightUpdateComponent, canActivate : [AdminAuthGuard] },
  {path: 'admin-view-staff', component: AdminStaffViewComponent, canActivate : [AdminAuthGuard] },
  {path: 'admin-update-staff/:id', component: AdminUpdateStaffComponent, canActivate : [AdminAuthGuard] },


  // if the route is wrong this will works
  {path: '**', component: LandingPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

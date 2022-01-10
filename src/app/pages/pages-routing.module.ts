import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';
import { LoansComponent } from './loans/loans.component';
import { MakersComponent } from './makers/makers.component';
import { MobileSIMComponent } from './mobile-sim/mobile-sim.component';
import { RecurringPaymentsComponent } from './recurring-payments/recurring-payments.component';
import { RiderBikeHistoryComponent } from './rider-bike-history/rider-bike-history.component';
import { RiderCarHistoryComponent } from './rider-car-history/rider-car-history.component';
import { RiderSimHistoryComponent } from './rider-sim-history/rider-sim-history.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'makers', component: MakersComponent },
  { path: 'mobileSIM', component: MobileSIMComponent },
  { path:'riderBikeHistory', component:RiderBikeHistoryComponent} ,
  { path:'riderCarHistory', component:RiderCarHistoryComponent},
  { path:'riderSimHistory', component:RiderSimHistoryComponent},
  { path:'loans',component:LoansComponent},
  { path:'recurringPayments', component:RecurringPaymentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

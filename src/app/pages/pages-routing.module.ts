import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikesComponent } from './bikes/bikes.component';
import { CarsComponent } from './cars/cars.component';

import { DefaultComponent } from './dashboards/default/default.component';
import { LoansComponent } from './loans/loans.component';
import { MakersComponent } from './makers/makers.component';
import { ManageRecurringPaymentsComponent } from './manage-recurring-payments/manage-recurring-payments.component';
import { MobileSimComponent } from './mobile-sim/mobile-sim.component';
import { RecurringPaymentsComponent } from './recurring-payments/recurring-payments.component';
import { RiderBikeHistoryComponent } from './rider-bike-history/rider-bike-history.component';
import { RiderCarHistoryComponent } from './rider-car-history/rider-car-history.component';
import { RiderLoansComponent } from './rider-loans/rider-loans.component';
import { RiderSimHistoryComponent } from './rider-sim-history/rider-sim-history.component';
import { RidersComponent } from './riders/riders.component';
import { TransactionCategoriesComponent } from './transaction-categories/transaction-categories.component';
import { UserTransactionsComponent } from './user-transactions/user-transactions.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard" },
  { path: "dashboard", component: DefaultComponent },
  { path: "riders", component: RidersComponent },
  { path: "transactionCategory", component: TransactionCategoriesComponent },
  { path: "bikes", component: BikesComponent },
  { path: "cars", component: CarsComponent },
  { path: "userTransactions", component: UserTransactionsComponent },
  { path: "loans", component: LoansComponent },
  { path: "makers", component: MakersComponent },
  { path: "mobileSim", component: MobileSimComponent },
  { path: "recurringPayments", component: RecurringPaymentsComponent },
  { path: "riderBikeHistory", component: RiderBikeHistoryComponent },
  { path: "riderCarHistory", component: RiderCarHistoryComponent },
  { path: "riderSimHistory", component: RiderSimHistoryComponent },
  {
    path: "manageRecurringPayments/:user_id",
    component: ManageRecurringPaymentsComponent,
  },
  { path: "riderLoans/:user_id", component: RiderLoansComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

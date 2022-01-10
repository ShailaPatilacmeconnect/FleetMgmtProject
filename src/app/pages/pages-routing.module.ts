import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BikesComponent } from './bikes/bikes.component';
import { CarsComponent } from './cars/cars.component';

import { DefaultComponent } from './dashboards/default/default.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

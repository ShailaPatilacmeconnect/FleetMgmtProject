import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';
import { RidersComponent } from './riders/riders.component';
import { TransactionCategoriesComponent } from './transaction-categories/transaction-categories.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard" },
  { path: "dashboard", component: DefaultComponent },
  { path: "riders", component: RidersComponent },
  { path: "transactionCategory", component: TransactionCategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

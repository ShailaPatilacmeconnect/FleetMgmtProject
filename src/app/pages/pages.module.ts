import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbNavModule, NgbDropdownModule, NgbModalModule,NgbAlertModule, NgbTooltipModule , NgbCollapseModule,NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { LightboxModule } from 'ngx-lightbox';

import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbdSortableHeader } from './table-sortable';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MakersComponent } from './makers/makers.component';
import { MobileSIMComponent } from './mobile-sim/mobile-sim.component';
import { RiderBikeHistoryComponent } from './rider-bike-history/rider-bike-history.component';
import { RiderCarHistoryComponent } from './rider-car-history/rider-car-history.component';
import { RiderSimHistoryComponent } from './rider-sim-history/rider-sim-history.component';
import { LoansComponent } from './loans/loans.component';
import { RecurringPaymentsComponent } from './recurring-payments/recurring-payments.component';
// import { permissionsComponent } from './database/permissions/permissions.component';
// import { apiComponent } from './api/api.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [
    NgbdSortableHeader,MakersComponent,MobileSIMComponent,RiderBikeHistoryComponent, RiderCarHistoryComponent, RiderSimHistoryComponent, LoansComponent, RecurringPaymentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbDatepickerModule,
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    DashboardsModule,
    HttpClientModule,
    UIModule,
    WidgetModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbCollapseModule,
    SimplebarAngularModule,
    LightboxModule,
    NgSelectModule,
    NgbAlertModule,
    CKEditorModule
  ],
  exports:[NgbdSortableHeader],

})
export class PagesModule { }

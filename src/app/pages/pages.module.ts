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

import { UserComponent } from './user/user.component';
import { userGroupComponent } from './settings/userGroup/userGroup.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { checkerComponent } from './checker/checker.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { merchantComponent } from './merchant/merchant.component';
import { databaseComponent } from './database/database.component';
import { dbUserComponent } from './dbUser/dbUser.component';
import { permissionsComponent } from './database/permissions/permissions.component';
import { apiComponent } from './api/api.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);

@NgModule({
  declarations: [UserComponent,userGroupComponent,
    SettingsComponent,checkerComponent,
    merchantComponent,dbUserComponent,databaseComponent,
    permissionsComponent,apiComponent,
    NgbdSortableHeader],
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

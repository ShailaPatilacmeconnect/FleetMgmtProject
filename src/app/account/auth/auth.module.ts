import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../shared/ui/ui.module';
import { StandardComponent } from './standard/login.component';
import { AuthRoutingModule } from './auth-routing';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ArchwizardModule } from 'angular-archwizard';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {  MatFormFieldModule} from '@angular/material/form-field';
// import { MatNativeDateModule } from '@angular/material/core'
import {Ng2TelInputModule} from 'ng2-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [StandardComponent,LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    UIModule,
    AuthRoutingModule,
    NgxIntlTelInputModule,
    CKEditorModule,
    NgbDatepickerModule,
    FormsModule,
    NgSelectModule,
    ColorPickerModule,
    NgxSliderModule,
    ImageCropperModule,
    NgxDropzoneModule,
    ArchwizardModule,
    // MatDatepickerModule,
    // MatFormFieldModule,
    // MatNativeDateModule,
    Ng2TelInputModule,
    BsDropdownModule,
    BsDatepickerModule.forRoot(),
    ],
})
export class AuthModule { }

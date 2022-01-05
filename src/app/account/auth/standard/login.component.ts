import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Options } from '@angular-slider/ngx-slider';

import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class StandardComponent implements OnInit, AfterViewInit {
	separateDialCode = true;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  selectedCountryISO='ae'
	preferredCountries= ["ae", "us"]; 
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean=false;
  public Editor = ClassicEditor;
  color='#fff';
  hoveredDate: NgbDate;
  hidden: boolean=true;
  selected: any;
  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();
  filescompressed:File[]=[];
  bsInlineRangeValue: Date[];

  @ViewChild('dp', { static: true }) datePicker: any;
  fromNGDate: NgbDate;
  toNGDate: NgbDate;
  value: number = 100;
  lowValue:number=20
  highValue: number = 60;
  options: Options = {
    floor: 0,
    ceil: 200
  };
  label1: any;
  label2: any;
  filename: any;
  imageChangedEvent: any;
  croppedImage: any;
  m_logo_path: string | ArrayBuffer;
  label3: any;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private authFackservice: AuthfakeauthenticationService) { }

  ngOnInit() {
    this.typeValidationForm = this.formBuilder.group({
      user_id:0,
      name: ['', [Validators.required]],
      company:['',[Validators.required]],
      phone:['',[Validators.required]],
      description:'',
      editor:'',
      number:'',
      selected:'',
      mobile:['',Validators.required,Validators.pattern('[0-9]{9,10}')],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [ Validators.minLength(10),Validators.pattern('^(?=(.*[a-zA-Z]){1,})(?=(.*[!@#$%^&*()_+|~=\`<{}:;’>?,./\"]){1,})(?=(.*[0-9]){1,}).{1,}$')]],
      confirmpwd: ['',],
      stocklist:this.formBuilder.array([])

    }, {
        validator: this.MustMatch('password', 'confirmpwd'),
      });
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.typeValidationForm.patchValue({
        selected:''
      })
    } else if (this.fromDate && !this.toDate && date.after(this.fromNGDate)) {
      this.toNGDate = date;
      this.toDate = new Date(date.year, date.month - 1, date.day);
      this.hidden = true;
      this.typeValidationForm.patchValue({
        selected:this.fromDate.toLocaleDateString() + '-' + this.toDate.toLocaleDateString()
      })
      this.dateRangeSelected.emit({ fromDate: this.fromDate, toDate: this.toDate });

      this.fromDate = null;
      this.toDate = null;
      this.fromNGDate = null;
      this.toNGDate = null;

    } else {
      this.fromNGDate = date;
      this.fromDate = new Date(date.year, date.month - 1, date.day);
      this.typeValidationForm.patchValue({
        selected:''
      })
    }
  }

  /**
   * Is hovered over date
   * @param date date obj
   */
  isHovered(date: NgbDate) {
    return this.fromNGDate && !this.toNGDate && this.hoveredDate && date.after(this.fromNGDate) && date.before(this.hoveredDate);
  }

  /**
   * @param date date obj
   */
  isInside(date: NgbDate) {
    return date.after(this.fromNGDate) && date.before(this.toNGDate);
  }
  /**
   * @param date date obj
   */
  isRange(date: NgbDate) {
    return date.equals(this.fromNGDate) || date.equals(this.toNGDate) || this.isInside(date) || this.isHovered(date);
  }
  get type() {
    return this.typeValidationForm.controls;
  }
  changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}
  ngAfterViewInit() {
  }
  public saveCode(e): void {
    let find = ['one','two','three'].find(x => x === e.target.value);
  }
  onFileSelected1(event) {
    // if(event.target.files[0].type=='image/png' || event.target.files[0].type=='image/jpg' || event.target.files[0].type=='image/jpeg'){
    //    this.imageType=true;
    // }else{
    //   this.imageType=false;
    //   return;
    // }if( event.target.files[0].size>2000000){
    //   this.sizeError=true;
    //   return;
    // }else{
    //   this.sizeError=false;
    // }
    // var fileName =event.target.files[0]['name'];
    // this.ng2ImgMaxService.resize([event.target.files[0]], 500,10000).subscribe((result)=>{
    //   this.logo=new File([result], fileName, { type: 'image/jpeg' });
    // });
  }
 typeSubmit(){
  this.typesubmit=true
 }
 onFileSelected(event,type){
  if(type==1){
    this.label1=event.target.files[0]['name']
  }
  if(type==2){
    this.label2=event.target.files.length+' files selected'
  }
  if(type==3){
      this.filename=this.label3= event.target.files[0].name
      this.imageChangedEvent = event
  }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    var reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
    this.m_logo_path= (<FileReader>event.target).result;
    }
    reader.readAsDataURL(this.authFackservice.dataURLtoFile(this.croppedImage, this.filename));
  }
  imageLoaded() {
  }
  cropperReady() {
  }
  loadImageFailed() {
  }
  onSelect(event) {
    event.addedFiles.forEach(x=>{
    this.filescompressed.push(x)
    })
  }
  onRemove(event) {
    this.filescompressed.splice(this.filescompressed.indexOf(event), 1);
  }

  field2(): FormGroup {
    return this.formBuilder.group({
      name:['', [Validators.required]],
      quantity:['', [Validators.required]],
    });
  }
  formData2(): FormArray {
    return this.typeValidationForm.get('stocklist') as FormArray;
  }
  removeField2(i: number) {
    if (confirm('Are you sure you want to delete this element?')) {
      this.formData2().removeAt(i);
    }
  }
  addField2() {
    this.formData2().push(this.field2());
  }
}

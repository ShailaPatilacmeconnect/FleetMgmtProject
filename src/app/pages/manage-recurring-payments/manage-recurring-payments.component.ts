import { Component, Input, OnInit, QueryList, ViewChildren  } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { notificationService } from 'src/app/core/services/notofication.service';
import Swal from 'sweetalert2';
import { NgbdSortableHeader } from '../table-sortable';

export type SortDirection = 'asc' | 'desc' | '';
export const compare = (v1:number|string, v2:number|string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string|null;
  direction: SortDirection;

}

@Component({
  selector: 'app-manage-recurring-payments',
  templateUrl: './manage-recurring-payments.component.html',
  styleUrls: ['./manage-recurring-payments.component.scss']
})
export class ManageRecurringPaymentsComponent implements OnInit {

  page={totalElements:0,pageNumber:1,size:10};

  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean=false;
  hrefLink: any;
  blob: Blob; 
  // @Input() service_id;
  riderLoanData:any=[];
  sortBy='';
  order='';
  keyword:string=''
  title='Add';
  riderId='';
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>=Object.create(null);
  constructor(private router: Router,private modalService: NgbModal,public notificationService:notificationService,
    private authFackservice: AuthfakeauthenticationService,public formBuilder: FormBuilder, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      // console.log('The id of this route is: ', params.id);
      this.riderId=params.id;
    });

    this.breadCrumbItems = [{label:'My Dashboard',href:'/dashboard'},{label:'Manage Recurring Payments', active: true }];
    this._fetchData();  
     
  }
  
  initForm(){
    this.typeValidationForm = this.formBuilder.group({
      // id:0,
      id: ['',[Validators.required, ]],
      amount: ['', [Validators.required]],
     
    }, );
    
  }
  conditionalrequiredValidator(client){      //factory function
    return (control: AbstractControl):{[key: string]: boolean} | null => {
      return (client=="Add"  && (control.value=="" || control.value==null))?{required:true}:null;
    };
  }

  search(){
    this.page.pageNumber=1;
    this._fetchData()
  }
  public _fetchData() {

    this.authFackservice.get('admin/riders/recurringPayments?user_id=6').subscribe(
      res => {
        if(res['status']==true){
          this.riderLoanData =res['data'];
          this.page.totalElements=res['elementCount']
        }
      });
  }
  get type() {
    return this.typeValidationForm.controls;
  }

  export(type){
    let parameter='transactions';
    let url='admin/riders/recurringPayments/export?user_id=6&type=csv';
   this.authFackservice.getFile(url).subscribe((res:any)=>{
     if(res.type=="application/json"){
      Swal.fire('Oops!', 'No Data Found.', 'error');
     }else if(res.type=="application/vnd.openxmlformats"|| res.type=="text/csv" ){
       this.blob = new Blob([res], {type: res.type});
       var downloadURL = URL.createObjectURL(this.blob);
       //this.sanitizer.bypassSecurityTrustResourceUrl()
       this.hrefLink = downloadURL;
       const link = document.createElement('a');
       link.setAttribute('target', '_blank');
       link.setAttribute('href', this.hrefLink);
       link.setAttribute('download', parameter+`.`+type);
       document.body.appendChild(link);
       link.click();
       link.remove();
     }
       });
  
  }
  largeModal(largeDataModal: any) {
    this.title='Add';
    this.typesubmit=false;
    this.initForm()
    this.typeValidationForm.reset();
    this.modalService.open(largeDataModal, { size: 'lg',windowClass:'modal-holder', centered: true });
  }
  editModal(largeDataModal: any,item) {
    // console.log(item.id)
    this.typesubmit=false;
    this.title='Edit';
    this.initForm();
    this.typeValidationForm.patchValue({
      // user_id: item.user_id,
      amount: item.amount,          
      id:item.id
    });
    this.modalService.open(largeDataModal,
       { size: 'sm',windowClass:'modal-holder',
        centered: true });
  }
  toggleFunction(event,id){
    let currentTarget=event.currentTarget.checked==true?0:1;

  let text='Are you sure to Disable';let confirmButtonText='Yes. Disable it!'
  if(currentTarget==0){
    text='Are you sure to Enable'; confirmButtonText='Yes. Enable it!'
  }
  Swal.fire({
    title: 'Are you sure?',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#34c38f',
    cancelButtonColor: '#f46a6a',
    confirmButtonText: confirmButtonText
  }).then(result => {
    if (result.value) {
      this.authFackservice.put('admin/riders/status?value=1&user_id=6',{}).subscribe(
      res => {
        if(res['status']==true){
          if(currentTarget==0)
          Swal.fire('Approved!', 'Selected Recurring Payments has been Enabled.', 'success');
          else
          Swal.fire('Rejected!', 'Selected Recurring Payments has been Disabled.', 'success');
          this._fetchData();
        }
      }); 
    }else this._fetchData();
  }) 

}
  
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    if (direction === '') {  
      this.order='';this.sortBy=''; this._fetchData();
    } else {
      this.order=direction;this.sortBy=column
      this._fetchData();
    }
  } 
  typeSubmit() {   
    this.typesubmit = true;
    if(this.typeValidationForm.status=='INVALID')
    return;
    var formData: any = new FormData();
    // formData.append("id", this.typeValidationForm.value.id);
    formData.append("amount", this.typeValidationForm.value.amount);     
    let data=this.typeValidationForm.value;
  
    if(data.id!=0){
      
        formData.append("id", this.typeValidationForm.value.id);
        this.authFackservice.putMultipart('admin/riders/recurringPayments',formData).subscribe(
          res => {
            if(res['status']==true){
  
              this._fetchData();
              Swal.fire('Success!', 'Selected Recurring Payments has been updated.', 'success');
  
            }else{
              
              Swal.fire('Error!', res['message'], 'error');
  
            }
            this.modalService.dismissAll()
          }); 
      
    }
    
  }
  pageChange(){
    this._fetchData();
  }
  pageCopy(){
    return {...this.page}
 }
  changePage(event){
    this.page.pageNumber=event;
    this._fetchData()
  }

}



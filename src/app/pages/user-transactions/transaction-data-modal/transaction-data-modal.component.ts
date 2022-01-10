import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: "app-transaction-data-modal",
  templateUrl: "./transaction-data-modal.component.html",
  styleUrls: ["./transaction-data-modal.component.scss"],
})
export class TransactionDataModalComponent implements OnInit {
  page = { totalElements: 0, pageNumber: 1, size: 10 };
  keyword: string = "";
  file: any;
  typeValidationForm: FormGroup;

  transactioncategoryData: any = [];
  userTransactionData: any = [];
  riderData: any = [];
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authFackservice: AuthfakeauthenticationService
  ) {
    // this.typeValidationForm = this.formBuilder.group({
    //   id: 0,
    this.typeValidationForm = this.formBuilder.group({
      id: 0,
      transaction_id: ["", [Validators.required]],
      // username: ["", [Validators.required]],
      // transaction_category_id: ["", [Validators.required]],
      // amount: ["", [Validators.required]],
      // message: ["", [Validators.required]],
      // transaction_type: ["", [Validators.required]],
      // updated_wallet_balance: ["", [Validators.required]],
      // created_at: ["", [Validators.required]],
      // event_date: ["", [Validators.required]],
      // event_time: ["", [Validators.required]],
      // import_version: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    // this._fetchTransactionCategoriesData();
    // this._fetchData();
    // this._fetchMakerData();
  }

  // typeValidationForm = this.formBuilder.group({
  //   id: 0,
  //   transaction_id: ["", [Validators.required]],
  //   // username: ["", [Validators.required]],
  //   // transaction_category_id: ["", [Validators.required]],
  //   // amount: ["", [Validators.required]],
  //   // message: ["", [Validators.required]],
  //   // transaction_type: ["", [Validators.required]],
  //   // updated_wallet_balance: ["", [Validators.required]],
  //   // created_at: ["", [Validators.required]],
  //   // event_date: ["", [Validators.required]],
  //   // event_time: ["", [Validators.required]],
  //   // import_version: ["", [Validators.required]],
  // });

  get type() {
    return this.typeValidationForm.controls;
  }
  // public _fetchData() {
  //   this.authFackservice
  //     .get(
  //       "admin/userTransactions?page=" +
  //         this.page.pageNumber +
  //         "&perPage=10&keyword=" +
  //         this.keyword
  //     )
  //     .subscribe((res) => {
  //       if (res["status"] == true) {
  //         this.userTransactionData = res["data"];
  //         this.page.totalElements = res["elementCount"];
  //       }
  //     });
  // }
  // // Get Transaction Categories
  // public _fetchTransactionCategoriesData() {
  //   this.authFackservice
  //     .get(
  //       "admin/transactionCategories?page=" +
  //         this.page.pageNumber +
  //         "&perPage=10&keyword=" +
  //         this.keyword
  //     )
  //     .subscribe((res) => {
  //       if (res["status"] == true) {
  //         this.transactioncategoryData = res["data"];
  //         console.log(this.transactioncategoryData);
  //         this.page.totalElements = res["elementCount"];
  //       }
  //     });
  // }
  // // Get Rider
  // public _fetchMakerData() {
  //   this.authFackservice
  //     .get(
  //       "admin/riders?page=" +
  //         this.page.pageNumber +
  //         "&perPage=10&keyword=" +
  //         this.keyword
  //     )
  //     .subscribe((res) => {
  //       if (res["status"] == true) {
  //         this.riderData = res["data"];
  //         console.log(this.riderData);
  //         this.page.totalElements = res["elementCount"];
  //       }
  //     });
  // }
}

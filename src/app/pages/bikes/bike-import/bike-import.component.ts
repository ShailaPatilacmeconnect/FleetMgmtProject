import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import Swal from 'sweetalert2';

@Component({
  selector: "app-bike-import",
  templateUrl: "./bike-import.component.html",
  styleUrls: ["./bike-import.component.scss"],
})
export class BikeImportComponent implements OnInit {
  page = { totalElements: 0, pageNumber: 1, size: 10 };
  keyword: string = "";
  file: any;
  // typeValidationForm: FormGroup;
  transactioncategoryData: any = [];
  userTransactionData: any = [];
  identifierKey: Array<any> = [{ user_id: "user_id" }, { phone: "phone" }];
  identifire: any = [];
  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    private authFackservice: AuthfakeauthenticationService
  ) {}

  ngOnInit() {
    this._fetchTransactionCategoriesData();
    this._fetchData();
    this.identifire = this.getIdentifire();
    console.log(this.identifire);
  }

  getIdentifire() {
    return this.identifierKey.slice();
  }

  // initForm() {
  typeValidationForm = this.formBuilder.group({
    id: 0,
    file_path: ["", [Validators.required]],
    transaction_category_id: ["", [Validators.required]],
    identifier_key: ["", [Validators.required]],
  });
  // }
  get type() {
    return this.typeValidationForm.controls;
  }
  public _fetchData() {
    this.authFackservice
      .get(
        "admin/userTransactions?page=" +
          this.page.pageNumber +
          "&perPage=10&keyword=" +
          this.keyword
      )
      .subscribe((res) => {
        if (res["status"] == true) {
          this.userTransactionData = res["data"];
          this.page.totalElements = res["elementCount"];
        }
      });
  }
  // Get Transaction Categories
  public _fetchTransactionCategoriesData() {
    this.authFackservice
      .get(
        "admin/transactionCategories?page=" +
          this.page.pageNumber +
          "&perPage=10&keyword=" +
          this.keyword
      )
      .subscribe((res) => {
        if (res["status"] == true) {
          this.transactioncategoryData = res["data"];
          console.log(this.transactioncategoryData);
          this.page.totalElements = res["elementCount"];
        }
      });
  }
  // CSV file Upload
  onFileSelected(event) {
    if (event.target.files[0].type != "application/vnd.ms-excel") {
      Swal.fire("Failed!", "Please upload a valid file.", "error");

      return;
    }
    this.file = event.target.files[0];
  }
  typeSubmit() {
    // this.typesubmit = true;
    // if (this.typeValidationForm.status == "INVALID") return;
    var formData: any = new FormData();
    formData.append("file_path", this.file);
    formData.append(
      "transaction_category_id",
      this.typeValidationForm.value.transaction_category_id
    );
    formData.append(
      "identifier_key",
      this.typeValidationForm.value.identifier_key
    );
    let data = this.typeValidationForm.value;

    this.authFackservice
      .postMultipart("admin/userTransactions/import", formData)
      .subscribe((res) => {
        if (res["status"] == true) {
          this._fetchData();
          Swal.fire("Success!", "Transaction has been added.", "success");
        } else {
          Swal.fire("Error!", res["message"], "error");
        }
        // this.modalService.dismissAll();
      });
  }
}

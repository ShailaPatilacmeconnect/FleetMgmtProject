import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import Swal from 'sweetalert2';

@Component({
  selector: "app-import",
  templateUrl: "./import.component.html",
  styleUrls: ["./import.component.scss"],
})
export class ImportComponent implements OnInit {
  page = { totalElements: 0, pageNumber: 1, size: 10 };
  keyword: string = "";
  file: any;
  // typeValidationForm: FormGroup;
  transactioncategoryData: any = [];
  userTransactionData: any = [];
  identifierKey: Array<any> = [
    { user_id: 1, phone: 1234567890 },
    { user_id: 2, phone: 1234567890 },
    { user_id: 3, phone: 1234567890 },
  ];
  identifire:any=[]
  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    private authFackservice: AuthfakeauthenticationService
  ) {}

  ngOnInit() {
    this._fetchTransactionCategoriesData();
    this._fetchData();
    this.identifire = this.getIdentifire()
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

  uploadFile(event: any) {
    // var reader = new FileReader();
    // reader.onload = (event: ProgressEvent) => {
    //   this.img = (<FileReader>event.target).result;
    // };
    // reader.readAsDataURL(event.target.files[0]);
    this.file = event.target.files[0];
    console.log(this.file);
  }
  typeSubmit() {
    // this.typesubmit = true;
    console.log("hi");
    // if (this.typeValidationForm.status == "INVALID") return;
    var formData: any = new FormData();
    formData.append("file_path", this.typeValidationForm.value.file_path);
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
          Swal.fire("Success!", "New Car has been added.", "success");
        } else {
          Swal.fire("Error!", res["message"], "error");
        }
        // this.modalService.dismissAll();
      });
  }
}

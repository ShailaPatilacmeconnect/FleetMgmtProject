import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import Swal from 'sweetalert2';

@Component({
  selector: "app-cars-import",
  templateUrl: "./cars-import.component.html",
  styleUrls: ["./cars-import.component.scss"],
})
export class CarsImportComponent implements OnInit {
  page = { totalElements: 0, pageNumber: 1, size: 10 };
  keyword: string = "";
  file: any;
  transactioncategoryData: any = [];
  userTransactionData: any = [];
  constructor(
    public activeModal: NgbActiveModal,
    public formBuilder: FormBuilder,
    private authFackservice: AuthfakeauthenticationService
  ) {}

  ngOnInit() {
    this._fetchData();
  }

  typeValidationForm = this.formBuilder.group({
    id: 0,
    file_path: ["", [Validators.required]],
    transaction_category_id: ["", [Validators.required]],
    identifier_key: ["", [Validators.required]],
  });

  get type() {
    return this.typeValidationForm.controls;
  }
  public _fetchData() {
    this.authFackservice
      .get(
        "admin/cars?page=" +
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
    let data = this.typeValidationForm.value;

    this.authFackservice
      .postMultipart("admin/cars/import", formData)
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

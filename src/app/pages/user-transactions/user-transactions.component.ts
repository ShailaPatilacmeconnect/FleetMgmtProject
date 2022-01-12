import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { notificationService } from "src/app/core/services/notofication.service";
import Swal from 'sweetalert2';
import { NgbdSortableHeader, SortEvent } from '../table-sortable';
import { ImportComponent } from './import/import.component';
import { TransactionDataModalComponent } from './transaction-data-modal/transaction-data-modal.component';
@Component({
  selector: "app-user-transactions",
  templateUrl: "./user-transactions.component.html",
  styleUrls: ["./user-transactions.component.scss"],
})
export class UserTransactionsComponent implements OnInit {
  page = { totalElements: 0, pageNumber: 1, size: 10 };

  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean = false;
  hrefLink: any;
  blob: Blob;
  userTransactionData: any = [];
  riderData: any = [];
  transactioncategoryData: any = [];
  sortBy = "";
  order = "";
  keyword: string = "";
  title = "Add";
  show: boolean = false;
  cD = "cars";
  details: any;
  file_path: string = "/C:/Users/Rahul/Documents/Fleet_fine_transactions.csv";
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> =
    Object.create(null);
  constructor(
    private router: Router,
    private modalService: NgbModal,
    public notificationService: notificationService,
    private authFackservice: AuthfakeauthenticationService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "My Dashboard", href: "/dashboard" },
      { label: "User Transaction", active: true },
    ];
    this._fetchData();
    console.log(this._fetchData());
    this._fetchMakerData();
    this._fetchTransactionCategoriesData();
  }

  initForm() {
    this.typeValidationForm = this.formBuilder.group({
      id: 0,
      user_id: ["", [Validators.required]],
      transaction_category_id: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      message: ["", [Validators.required]],
      status: ["", [Validators.required]],
      // file_path:[]
    });
  }
  conditionalrequiredValidator(client) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return client == "Add" && (control.value == "" || control.value == null)
        ? { required: true }
        : null;
    };
  }
  MustMatch(controlName: string, productCategoryName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const productCategoryControl = formGroup.controls[productCategoryName];

      if (
        productCategoryControl.errors &&
        !productCategoryControl.errors.mustMatch
      ) {
        return;
      }

      if (control.value !== productCategoryControl.value) {
        productCategoryControl.setErrors({ mustMatch: true });
      } else {
        productCategoryControl.setErrors(null);
      }
    };
  }
  search() {
    this.page.pageNumber = 1;
    this._fetchData();
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
          console.log(this.userTransactionData);
          this.page.totalElements = res["elementCount"];
        }
      });
  }
  // Get Rider
  public _fetchMakerData() {
    this.authFackservice
      .get(
        "admin/riders?page=" +
          this.page.pageNumber +
          "&perPage=10&keyword=" +
          this.keyword
      )
      .subscribe((res) => {
        if (res["status"] == true) {
          this.riderData = res["data"];
          console.log(this.riderData);
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
          this.page.totalElements = res["elementCount"];
        }
      });
  }

  get type() {
    return this.typeValidationForm.controls;
  }
  largeModal(largeDataModal: any) {
    this.title = "Add";
    this.typesubmit = false;
    this.initForm();
    this.typeValidationForm.reset();
    this.modalService.open(largeDataModal, {
      size: "lg",
      windowClass: "modal-holder",
      centered: true,
    });
  }
  uploadFile($event, file: any) {
    // console.log("file_path");
    const formData = new FormData();
    formData.append("file", file, file.name);
    this.authFackservice
      .postMultipart("admin/fineTransactions/import", formData)
      .subscribe((res) => {
        if (res["status"] == true) {
          this._fetchData();
          Swal.fire("Success!", "New Transaction has been added.", "success");
        } else {
          Swal.fire("Error!", res["message"], "error");
        }
        this.modalService.dismissAll();
      });
    console.log($event.target.files[0]); // outputs the first file
  }

  selectFile(type) {
    type == 1
      ? document.getElementById("file1").click()
      : document.getElementById("file").click();
  }

  onFileSelected(event,type) {
    if (event.target.files[0].type!= "application/vnd.ms-excel") {
      Swal.fire("Failed!", "Please upload a valid file.", "error");

      return;
    }
    var formData: any = new FormData();
    formData.append("file_path", event.target.files[0]);
    // let url = type == 2 ? "user/license/import" : "user/license/remove";
    this.authFackservice.postMultipart("admin/fineTransactions/import", formData).subscribe((resp) => {
      if (resp["status"] == true) {
        Swal.fire("Success!", "Fine Transaction has been added.", "success");
        this._fetchData();
      } else {
        console.log(resp["data"]);
        Swal.fire(
          "Failed!",
          "Found " + resp["data"]["invalid"] + " Invalid Entries",
          "error"
        );
      }
    });
  }

  import() {
    this.modalService.open(ImportComponent, {
      size: "sx",
      windowClass: "modal-holder",
      centered: true,
    });
  }
  editModals(item) {
    this.typesubmit = false;
    this.title = "Edit";
    this.initForm();
    this.typeValidationForm.patchValue({
      user_id: item.user_id,
      transaction_category_id: item.transaction_category_id,
      amount: item.amount,
      message: item.message,
      status: item.status,
      id: item.id,
    });
  }
  // On Row Click
  displayModal(largeDataModal1: any, item) {
    // this.editModals(item);
    this.details = item;
    this.modalService.open(largeDataModal1, {
      size: "xs",
      windowClass: "modal-holder",
      centered: true,
    });
  }
  // displayModal() {
  //   // this.editModals(item);
  //   this.modalService.open(TransactionDataModalComponent, {
  //     size: "xs",
  //     windowClass: "modal-holder",
  //     centered: true,
  //   });
  // }
  //  On Edit Button Click
  editModal(largeDataModal: any, item) {
    // this.showImage=!this.showImage
    this.editModals(item);
    this.modalService.open(largeDataModal, {
      size: "lg",
      windowClass: "modal-holder",
      centered: true,
    });
  }
  //  checked = true ? 0 : 1;
  toggle(e) {
    // console.log(id);
    const a = e.target.value;
    console.log(a);
    if (a == 1) {
      this.show = !this.show;
    } else {
      return this.show;
    }
  }
  toggleFunction(event, id) {
    console.log(id);
    let currentTarget = event.currentTarget.checked == true ? 0 : 1;
    let text = "Are you sure to Disable";
    let confirmButtonText = "Yes. Disable it!";
    if (currentTarget == 0) {
      text = "Are you sure to Enable";
      confirmButtonText = "Yes. Enable it!";
    }
    Swal.fire({
      title: "Are you sure?",
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: confirmButtonText,
    }).then((result) => {
      if (result.value) {
        this.authFackservice
          .put(
            "admin/parameter/status?value=" +
              currentTarget +
              "&id=" +
              id +
              "&type=" +
              this.cD,
            {}
          )
          .subscribe((res) => {
            if (res["status"] == true) {
              if (currentTarget == 0)
                Swal.fire(
                  "Approved!",
                  "Selected Transaction has been Enabled.",
                  "success"
                );
              else
                Swal.fire(
                  "Rejected!",
                  "Selected Transaction has been Disabled.",
                  "success"
                );
              this._fetchData();
            }
          });
      } else this._fetchData();
    });
  }
  deleteRow(item) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.authFackservice
          .delete("admin/parameter?id=" + item.id + "&type=" + this.cD)
          .subscribe((res) => {
            if (res["status"] == true) {
              Swal.fire(
                "Deleted!",
                "selected Transaction has been deleted.",
                "success"
              );
              this._fetchData();
            }
          });
      }
    });
  }
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });
    if (direction === "") {
      this.order = "";
      this.sortBy = "";
      this._fetchData();
    } else {
      this.order = direction;
      this.sortBy = column;
      this._fetchData();
    }
  }
  typeSubmit() {
    this.typesubmit = true;
    if (this.typeValidationForm.status == "INVALID") return;
    var formData: any = new FormData();
    formData.append("user_id", this.typeValidationForm.value.user_id);
    formData.append(
      "transaction_category_id",
      this.typeValidationForm.value.transaction_category_id
    );
    formData.append("amount", this.typeValidationForm.value.amount);
    formData.append("message", this.typeValidationForm.value.message);
    formData.append("status", this.typeValidationForm.value.status);
    let data = this.typeValidationForm.value;
    if (data.id == 0 || data.id == null) {
      this.authFackservice
        .postMultipart("admin/userTransactions", formData)
        .subscribe((res) => {
          if (res["status"] == true) {
            this._fetchData();
            Swal.fire("Success!", "New Transaction has been added.", "success");
          } else {
            Swal.fire("Error!", res["message"], "error");
          }
          this.modalService.dismissAll();
        });
    } else {
      formData.append("id", this.typeValidationForm.value.id);
      this.authFackservice
        .putMultipart("admin/userTransactions", formData)
        .subscribe((res) => {
          if (res["status"] == true) {
            this._fetchData();
            Swal.fire("Success!", "Selected Transaction has been updated.", "success");
          } else {
            Swal.fire("Error!", res["message"], "error");
          }
          this.modalService.dismissAll();
        });
    }
  }

  export(type) {
    let parameter = "transactions";
    this.authFackservice
      .getFile("admin/userTransactions/export?type=csv")
      .subscribe((res: any) => {
        if (res.type == "application/json") {
        } else if (
          res.type == "application/vnd.openxmlformats" ||
          res.type == "text/csv"
        ) {
          this.blob = new Blob([res], { type: res.type });
          var downloadURL = URL.createObjectURL(this.blob);
          //this.sanitizer.bypassSecurityTrustResourceUrl()
          this.hrefLink = downloadURL;
          const link = document.createElement("a");
          link.setAttribute("target", "_blank");
          link.setAttribute("href", this.hrefLink);
          link.setAttribute("download", parameter + `.` + type);
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      });
  }
  pageChange() {
    this._fetchData();
  }
  pageCopy() {
    return { ...this.page };
  }
  changePage(event) {
    this.page.pageNumber = event;
    this._fetchData();
  }
}

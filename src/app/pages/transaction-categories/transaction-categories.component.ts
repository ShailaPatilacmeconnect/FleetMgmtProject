import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { notificationService } from "src/app/core/services/notofication.service";
import Swal from 'sweetalert2';
import { NgbdSortableHeader, SortEvent } from '../table-sortable';

@Component({
  selector: "app-transaction-categories",
  templateUrl: "./transaction-categories.component.html",
  styleUrls: ["./transaction-categories.component.scss"],
})
export class TransactionCategoriesComponent implements OnInit {
  /**
   * Ecomerce repeated component
   */

  page = { totalElements: 0, pageNumber: 1, size: 10 };

  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean = false;

  productCategoryData: any = [];
  sortBy = "";
  order = "";
  keyword: string = "";
  title = "Add";
  show: boolean = false;
  pD = "product_categories";
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
      { label: "Product Category", active: true },
    ];
    this._fetchData();
  }

  initForm() {
    this.typeValidationForm = this.formBuilder.group({
      id: 0,
      category_name: ["", [Validators.required]],
      hasParent: ["", [Validators.required]],
      parent_id: [""],
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
        "admin/transactionCategories?page=" +
          this.page.pageNumber +
          "&perPage=10&keyword=" +
          this.keyword
      )
      .subscribe((res) => {
        if (res["status"] == true) {
          this.productCategoryData = res["data"];
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

  editModal(largeDataModal: any, item) {
    this.typesubmit = false;
    this.title = "Edit";
    this.initForm();
    this.typeValidationForm.patchValue({
      category_name: item.category_name,
      hasParent: item.hasParent,
      parent_id: item.parent_id,
      id: item.id,
    });
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
              this.pD,
            {}
          )
          .subscribe((res) => {
            if (res["status"] == true) {
              if (currentTarget == 0)
                Swal.fire(
                  "Approved!",
                  "Selected Product Category has been Enabled.",
                  "success"
                );
              else
                Swal.fire(
                  "Rejected!",
                  "Selected Product Category has been Disabled.",
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
          .delete("admin/parameter?id=" + item.id + "&type=" + this.pD)
          .subscribe((res) => {
            if (res["status"] == true) {
              Swal.fire(
                "Deleted!",
                "selected Product Category has been deleted.",
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
    formData.append(
      "category_name",
      this.typeValidationForm.value.category_name
    );
    formData.append("hasParent", this.typeValidationForm.value.hasParent);
    formData.append("parent_id", this.typeValidationForm.value.parent_id);
    let data = this.typeValidationForm.value;
    if (data.id == 0 || data.id == null) {
      this.authFackservice
        .postMultipart("admin/transactionCategories", formData)
        .subscribe((res) => {
          if (res["status"] == true) {
            this._fetchData();
            Swal.fire(
              "Success!",
              "New Product Category has been added.",
              "success"
            );
          } else {
            Swal.fire("Error!", res["message"], "error");
          }
          this.modalService.dismissAll();
        });
    } else {
      formData.append("id", this.typeValidationForm.value.id);
      this.authFackservice
        .putMultipart("admin/transactionCategories", formData)
        .subscribe((res) => {
          if (res["status"] == true) {
            this._fetchData();
            Swal.fire(
              "Success!",
              "Selected Product Category has been updated.",
              "success"
            );
          } else {
            Swal.fire("Error!", res["message"], "error");
          }
          this.modalService.dismissAll();
        });
    }
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

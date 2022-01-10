import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { notificationService } from "src/app/core/services/notofication.service";
import Swal from 'sweetalert2';
import { NgbdSortableHeader, SortEvent } from '../table-sortable';
@Component({
  selector: "app-cars",
  templateUrl: "./cars.component.html",
  styleUrls: ["./cars.component.scss"],
})
export class CarsComponent implements OnInit {
  page = { totalElements: 0, pageNumber: 1, size: 10 };

  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean = false;

  carData: any = [];
  makerData: any = [];
  sortBy = "";
  order = "";
  keyword: string = "";
  title = "Add";
  show: boolean = false;
  cD = "cars";
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
      { label: "Car", active: true },
    ];
    this._fetchData();
    this._fetchMakerData();
  }

  initForm() {
    this.typeValidationForm = this.formBuilder.group({
      id: 0,
      car_id: ["", [Validators.required]],
      vim: ["", [Validators.required]],
      plate: ["", [Validators.required]],
      purchase_date: ["", [Validators.required]],
      maker_id: ["", [Validators.required]],
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

  // Get Makers
  public _fetchMakerData() {
    this.authFackservice
      .get(
        "admin/makers?page=" +
          this.page.pageNumber +
          "&perPage=10&keyword=" +
          this.keyword
      )
      .subscribe((res) => {
        if (res["status"] == true) {
          this.makerData = res["data"];
          this.page.totalElements = res["elementCount"];
        }
      });
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
          this.carData = res["data"];
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
      car_id: item.car_id,
      vim: item.vim,
      plate: item.plate,
      purchase_date: item.purchase_date,
      maker_id: item.maker_id,
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
              this.cD,
            {}
          )
          .subscribe((res) => {
            if (res["status"] == true) {
              if (currentTarget == 0)
                Swal.fire(
                  "Approved!",
                  "Selected Car has been Enabled.",
                  "success"
                );
              else
                Swal.fire(
                  "Rejected!",
                  "Selected Car has been Disabled.",
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
                "selected Car has been deleted.",
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
    formData.append("car_id", this.typeValidationForm.value.car_id);
    formData.append("vim", this.typeValidationForm.value.vim);
    formData.append("plate", this.typeValidationForm.value.plate);
    formData.append(
      "purchase_date",
      this.typeValidationForm.value.purchase_date
    );
    formData.append("maker_id", this.typeValidationForm.value.maker_id);
    let data = this.typeValidationForm.value;
    if (data.id == 0 || data.id == null) {
      this.authFackservice
        .postMultipart("admin/cars", formData)
        .subscribe((res) => {
          if (res["status"] == true) {
            this._fetchData();
            Swal.fire("Success!", "New Car has been added.", "success");
          } else {
            Swal.fire("Error!", res["message"], "error");
          }
          this.modalService.dismissAll();
        });
    } else {
      formData.append("id", this.typeValidationForm.value.id);
      this.authFackservice
        .putMultipart("admin/cars", formData)
        .subscribe((res) => {
          if (res["status"] == true) {
            this._fetchData();
            Swal.fire("Success!", "Selected Car has been updated.", "success");
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

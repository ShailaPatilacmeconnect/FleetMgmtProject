import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { notificationService } from "src/app/core/services/notofication.service";
import Swal from 'sweetalert2';
import { NgbdSortableHeader, SortEvent } from '../table-sortable';

@Component({
  selector: "app-bikes",
  templateUrl: "./bikes.component.html",
  styleUrls: ["./bikes.component.scss"],
})
export class BikesComponent implements OnInit {
  page = { totalElements: 0, pageNumber: 1, size: 10 };

  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean = false;
  hrefLink: any;
  blob: Blob;
  bikesData: any = [];
  makerData: any = [];
  sortBy = "";
  order = "";
  keyword: string = "";
  title = "Add";
  show: boolean = false;
  tD = "bikes";
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
      { label: "Bike", active: true },
    ];
    this._fetchData();
    this._fetchMakerData();
  }

  initForm() {
    this.typeValidationForm = this.formBuilder.group({
      id: 0,
      bike_id: ["", [Validators.required]],
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
        "admin/bikes?page=" +
          this.page.pageNumber +
          "&perPage=10&keyword=" +
          this.keyword
      )
      .subscribe((res) => {
        if (res["status"] == true) {
          this.bikesData = res["data"];
          this.page.totalElements = res["elementCount"];
        }
      });
  }
  get type() {
    return this.typeValidationForm.controls;
  }
  export(type) {
    let parameter = "transactions";
    this.authFackservice
      .getFile("admin/bikes/export?type=csv")
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
  onFileSelected(event) {
    if (event.target.files[0].type != "application/vnd.ms-excel") {
      Swal.fire("Failed!", "Please upload a valid file.", "error");

      return;
    }
    var formData: any = new FormData();
    formData.append("file_path", event.target.files[0]);
    // let url = type == 2 ? "user/license/import" : "user/license/remove";
    this.authFackservice
      .postMultipart("admin/bikes/import", formData)
      .subscribe((resp) => {
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
      bike_id: item.bike_id,
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
              this.tD,
            {}
          )
          .subscribe((res) => {
            if (res["status"] == true) {
              if (currentTarget == 0)
                Swal.fire(
                  "Approved!",
                  "Selected Bike has been Enabled.",
                  "success"
                );
              else
                Swal.fire(
                  "Rejected!",
                  "Selected Bike has been Disabled.",
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
          .delete("admin/parameter?id=" + item.id + "&type=" + this.tD)
          .subscribe((res) => {
            if (res["status"] == true) {
              Swal.fire(
                "Deleted!",
                "selected Bike has been deleted.",
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
    formData.append("bike_id", this.typeValidationForm.value.bike_id);
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
        .postMultipart("admin/bikes", formData)
        .subscribe((res) => {
          if (res["status"] == true) {
            this._fetchData();
            Swal.fire("Success!", "New Bike has been added.", "success");
          } else {
            Swal.fire("Error!", res["message"], "error");
          }
          this.modalService.dismissAll();
        });
    } else {
      formData.append("id", this.typeValidationForm.value.id);
      this.authFackservice
        .putMultipart("admin/bikes", formData)
        .subscribe((res) => {
          if (res["status"] == true) {
            this._fetchData();
            Swal.fire("Success!", "Selected Bike has been updated.", "success");
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

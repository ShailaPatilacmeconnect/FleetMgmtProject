import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { notificationService } from "src/app/core/services/notofication.service";
import Swal from 'sweetalert2';
import { NgbdSortableHeader, SortEvent } from '../table-sortable';
import { RiderImportComponent } from './rider-import/rider-import.component';

@Component({
  selector: "app-riders",
  templateUrl: "./riders.component.html",
  styleUrls: ["./riders.component.scss"],
})
export class RidersComponent implements OnInit {
  /**
   * Ecomerce repeated component
   */

  page = { totalElements: 0, pageNumber: 1, size: 10 };

  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean = false;
  hrefLink: any;
  blob: Blob;
  riderData: any = [];
  sortBy = "";
  order = "";
  keyword: string = "";
  title = "Add";
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
      { label: "Riders", active: true },
    ];
    this._fetchData();
  }

  initForm() {
    this.typeValidationForm = this.formBuilder.group({
      user_id: 0,
      name: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
        ],
      ],
      phone: ["", [Validators.required, Validators.pattern("[0-9]{9,10}")]],
      vehicle: ["", [Validators.required]],
      company_id1: ["", [Validators.required]],
      company_id2: ["", [Validators.required]],
      company_id3: ["", [Validators.required]],
    });
  }

  getRiderLoans(user_id) {
    this.router.navigate(["/riderLoans", user_id]);
  }
  getRiderRecurringPayments(user_id) {
    this.router.navigate(["/manageRecurringPayments", user_id]);
  }
  getCarHistory(user_id) {
    this.router.navigate(["/riderCarHistory", user_id]);
  }
  getBikeHistory(user_id) {
    this.router.navigate(["/riderBikeHistory", user_id]);
  }
  getSimHistory(user_id) {
    this.router.navigate(["/riderSimHistory", user_id]);
  }
  conditionalrequiredValidator(client) {
    //factory function
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return client == "Add" && (control.value == "" || control.value == null)
        ? { required: true }
        : null;
    };
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
  search() {
    this.page.pageNumber = 1;
    this._fetchData();
  }
  public _fetchData() {
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
  import() {
    this.modalService.open(RiderImportComponent, {
      size: "sx",
      windowClass: "modal-holder",
      centered: true,
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
      name: item.name,
      email: item.email,
      phone: item.phone,
      vehicle: item.vehicle,
      company_id1: item.company_id1,
      company_id2: item.company_id2,
      company_id3: item.company_id3,
      user_id: item.user_id,
    });
    this.modalService.open(largeDataModal, {
      size: "lg",
      windowClass: "modal-holder",
      centered: true,
    });
  }

  toggleFunction(event, user_id) {
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
            "admin/riders/status?value=" +
              currentTarget +
              "&user_id=" +
              user_id,
            {}
          )
          .subscribe((res) => {
            if (res["status"] == true) {
              if (currentTarget == 0)
                Swal.fire(
                  "Approved!",
                  "Selected Rider has been Enabled.",
                  "success"
                );
              else
                Swal.fire(
                  "Rejected!",
                  "Selected Rider has been Disabled.",
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
          .delete("admin/riders?user_id=" + item.user_id)
          .subscribe((res) => {
            if (res["status"] == true) {
              Swal.fire(
                "Deleted!",
                "selected Rider has been deleted.",
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
    formData.append("name", this.typeValidationForm.value.name);
    formData.append("email", this.typeValidationForm.value.email);
    formData.append("phone", this.typeValidationForm.value.phone);
    formData.append("vehicle", this.typeValidationForm.value.vehicle);
    formData.append("company_id1", this.typeValidationForm.value.company_id1);
    formData.append("company_id2", this.typeValidationForm.value.company_id2);
    formData.append("company_id3", this.typeValidationForm.value.company_id3);

    let data = this.typeValidationForm.value;
    if (data.user_id == 0 || data.user_id == null) {
      this.authFackservice
        .postMultipart("admin/riders", formData)
        .subscribe((res) => {
          if (res["status"] == true) {
            this._fetchData();
            Swal.fire("Success!", "New Rider has been added.", "success");
          } else {
            Swal.fire("Error!", res["message"], "error");
          }
          this.modalService.dismissAll();
        });
    } else {
      formData.append("user_id", this.typeValidationForm.value.user_id);
      this.authFackservice
        .putMultipart("admin/riders", formData)
        .subscribe((res) => {
          if (res["status"] == true) {
            this._fetchData();
            Swal.fire(
              "Success!",
              "Selected Rider has been updated.",
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

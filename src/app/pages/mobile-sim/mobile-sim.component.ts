import { Component, OnInit, QueryList, ViewChildren  } from '@angular/core';
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
  selector: "app-mobile-sim",
  templateUrl: "./mobile-sim.component.html",
  styleUrls: ["./mobile-sim.component.scss"],
})
export class MobileSimComponent implements OnInit {
  page = { totalElements: 0, pageNumber: 1, size: 10 };

  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean = false;

  mobileSimData: any = [];
  sortBy = "";
  order = "";
  riderId="";
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
      { label: "Mobile SIM", active: true },
    ];
    
    this._fetchData();
  }

  initForm() {
    this.typeValidationForm = this.formBuilder.group({
      id: 0,
      serial_number: ["",
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ],
      ],
      number: ["", [Validators.required, Validators.pattern('^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{9}\s*,?$')]],
    });
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
        "admin/mobileSims?page=" +
          this.page.pageNumber +
          "&perPage=10&keyword=" +
          this.keyword
      )
      .subscribe((res) => {
        if (res["status"] == true) {
          this.mobileSimData = res["data"];
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
      size: "xs",
      windowClass: "modal-holder",
      centered: true,
    });
  }
  editModal(largeDataModal: any, item) {
    this.typesubmit = false;
    this.title = "Edit";
    this.initForm();
    this.typeValidationForm.patchValue({
      serial_number: item.serial_number,
      number: item.number,
      id: item.id,
    });
    this.modalService.open(largeDataModal, {
      size: "xs",
      windowClass: "modal-holder",
      centered: true,
    });
  }
  toggleFunction(event, id) {
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
              "&type=mobile_sims",
            {}
          )
          .subscribe((res) => {
            if (res["status"] == true) {
              if (currentTarget == 0)
                Swal.fire(
                  "Approved!",
                  "Selected MobileSIM has been Enabled.",
                  "success"
                );
              else
                Swal.fire(
                  "Rejected!",
                  "Selected MobileSIM has been Disabled.",
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
          .delete("admin/parameter?id=" + item.id + "&type=mobile_sims")
          .subscribe((res) => {
            if (res["status"] == true) {
              Swal.fire(
                "Deleted!",
                "selected MobileSIM has been deleted.",
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
      "serial_number",
      this.typeValidationForm.value.serial_number
    );
    formData.append("number", this.typeValidationForm.value.number);

    let data = this.typeValidationForm.value;
    if (data.id == 0 || data.id == null) {
      this.authFackservice
        .postMultipart("admin/mobileSims", formData)
        .subscribe((res) => {
          if (res["status"] == true) {
            this._fetchData();
            Swal.fire("Success!", "New MobileSIM has been added.", "success");
          } else {
            Swal.fire("Error!", res["message"], "error");
          }
          this.modalService.dismissAll();
        });
    } else {
      formData.append("id", this.typeValidationForm.value.id);
      this.authFackservice
        .putMultipart("admin/mobileSims", formData)
        .subscribe((res) => {
          if (res["status"] == true) {
            this._fetchData();
            Swal.fire(
              "Success!",
              "Selected MobileSIM has been updated.",
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


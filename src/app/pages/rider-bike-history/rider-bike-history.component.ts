import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthfakeauthenticationService } from "src/app/core/services/authfake.service";
import { notificationService } from "src/app/core/services/notofication.service";
import Swal from "sweetalert2";
import { NgbdSortableHeader } from "../table-sortable";

export type SortDirection = "asc" | "desc" | "";
export const compare = (v1: number | string, v2: number | string) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string | null;
  direction: SortDirection;
}

@Component({
  selector: "app-rider-bike-history",
  templateUrl: "./rider-bike-history.component.html",
  styleUrls: ["./rider-bike-history.component.scss"],
})
export class RiderBikeHistoryComponent implements OnInit {
  page = { totalElements: 0, pageNumber: 1, size: 10 };

  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; 
  typesubmit: boolean = false;

  rideHistoryData: any = [];
  ridersData: any = [];
  bikesData: any = [];
  sortBy = "";
  order = "";
  riderId="";
  keyword: string = "";
  // title='Add';
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> =
    Object.create(null);
  constructor(
    private router: Router,
    private modalService: NgbModal,
    public notificationService: notificationService,
    private activeRoute: ActivatedRoute,
    private authFackservice: AuthfakeauthenticationService,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "My Dashboard", href: "/dashboard" },
      { label: "Assign Bike", active: true },
    ];
    this.activeRoute.params.subscribe(params=>{
      console.log('The id of this route is: ', params.user_id);
      this.riderId=params.user_id;
    });
    this._fetchData();
  }

  initForm() {
    this.typeValidationForm = this.formBuilder.group({
      id: 0,
      name: [""],
      plate: ["", [Validators.required]],
      km: ["", [Validators.required]],
      event_date_time: ["", [Validators.required]],
    });
  }

  search() {
    this.page.pageNumber = 1;
    this._fetchData();
  }
  public _fetchData() {
    this.authFackservice
      .get(
        "admin/rideHistory/bike?user_id="+this.riderId+"&page=" +
          this.page.pageNumber +
          "&perPage=10&keyword=" +
          this.keyword
      )
      .subscribe((res) => {
        if (res["status"] == true) {
          this.rideHistoryData = res["data"];
          this.page.totalElements = res["elementCount"];
        }
      });
    this.authFackservice.get("/admin/riders").subscribe((res) => {
      if (res["status"] == true) {
        this.ridersData = res["data"];
        this.page.totalElements = res["elementCount"];
      }
    });
    this.authFackservice.get("/admin/bikes").subscribe((res) => {
      if (res["status"] == true) {
        this.bikesData = res["data"];
        this.page.totalElements = res["elementCount"];
      }
    });
  }
  get type() {
    return this.typeValidationForm.controls;
  }
  largeModal(largeDataModal: any) {
    // this.title='Add';
    this.typesubmit = false;
    this.initForm();
    this.typeValidationForm.reset();
    this.modalService.open(largeDataModal, {
      size: "xs",
      windowClass: "modal-holder",
      centered: true,
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
    formData.append("user_id", this.riderId);
    formData.append("bike_id", this.typeValidationForm.value.plate);
    formData.append("km", this.typeValidationForm.value.km);
    formData.append(
      "event_date_time",
      this.typeValidationForm.value.event_date_time
    );
    let data = this.typeValidationForm.value;
    if (data.id == 0 || data.id == null) {
      this.authFackservice
        .postMultipart("admin/rideHistory/bike", formData)
        .subscribe((res) => {
          if (res["status"] == true) {
            this._fetchData();
            Swal.fire(
              "Success!",
              "New RiderBikeHistory has been added.",
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

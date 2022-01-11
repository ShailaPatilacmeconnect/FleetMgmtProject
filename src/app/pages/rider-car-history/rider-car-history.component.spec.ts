import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderCarHistoryComponent } from './rider-car-history.component';

describe('RiderCarHistoryComponent', () => {
  let component: RiderCarHistoryComponent;
  let fixture: ComponentFixture<RiderCarHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiderCarHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderCarHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

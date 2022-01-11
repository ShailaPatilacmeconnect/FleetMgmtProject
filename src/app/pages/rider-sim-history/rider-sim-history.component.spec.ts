import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderSimHistoryComponent } from './rider-sim-history.component';

describe('RiderSimHistoryComponent', () => {
  let component: RiderSimHistoryComponent;
  let fixture: ComponentFixture<RiderSimHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiderSimHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderSimHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

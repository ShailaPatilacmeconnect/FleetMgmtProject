import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderBikeHistoryComponent } from './rider-bike-history.component';

describe('RiderBikeHistoryComponent', () => {
  let component: RiderBikeHistoryComponent;
  let fixture: ComponentFixture<RiderBikeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiderBikeHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderBikeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

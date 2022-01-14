import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderImportComponent } from './rider-import.component';

describe('RiderImportComponent', () => {
  let component: RiderImportComponent;
  let fixture: ComponentFixture<RiderImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiderImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

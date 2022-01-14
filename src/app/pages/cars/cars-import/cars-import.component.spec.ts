import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsImportComponent } from './cars-import.component';

describe('CarsImportComponent', () => {
  let component: CarsImportComponent;
  let fixture: ComponentFixture<CarsImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

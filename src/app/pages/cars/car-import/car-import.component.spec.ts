import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarImportComponent } from './car-import.component';

describe('CarImportComponent', () => {
  let component: CarImportComponent;
  let fixture: ComponentFixture<CarImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

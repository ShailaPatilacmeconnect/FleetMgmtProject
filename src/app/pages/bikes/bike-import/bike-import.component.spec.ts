import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeImportComponent } from './bike-import.component';

describe('BikeImportComponent', () => {
  let component: BikeImportComponent;
  let fixture: ComponentFixture<BikeImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

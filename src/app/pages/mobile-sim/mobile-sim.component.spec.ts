import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSimComponent } from './mobile-sim.component';

describe('MobileSimComponent', () => {
  let component: MobileSimComponent;
  let fixture: ComponentFixture<MobileSimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileSimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCategoriesComponent } from './transaction-categories.component';

describe('TransactionCategoriesComponent', () => {
  let component: TransactionCategoriesComponent;
  let fixture: ComponentFixture<TransactionCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

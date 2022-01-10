import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDataModalComponent } from './transaction-data-modal.component';

describe('TransactionDataModalComponent', () => {
  let component: TransactionDataModalComponent;
  let fixture: ComponentFixture<TransactionDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionDataModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

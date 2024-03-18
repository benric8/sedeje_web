import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDepositosComponent } from './detalle-depositos.component';

describe('DetalleDepositosComponent', () => {
  let component: DetalleDepositosComponent;
  let fixture: ComponentFixture<DetalleDepositosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleDepositosComponent]
    });
    fixture = TestBed.createComponent(DetalleDepositosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

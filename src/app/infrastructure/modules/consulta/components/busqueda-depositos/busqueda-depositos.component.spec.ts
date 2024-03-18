import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaDepositosComponent } from './busqueda-depositos.component';

describe('BusquedaDepositosComponent', () => {
  let component: BusquedaDepositosComponent;
  let fixture: ComponentFixture<BusquedaDepositosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaDepositosComponent]
    });
    fixture = TestBed.createComponent(BusquedaDepositosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

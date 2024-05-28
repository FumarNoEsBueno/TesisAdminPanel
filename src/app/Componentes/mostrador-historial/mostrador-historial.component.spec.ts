import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostradorCompraComponent } from './mostrador-compra.component';

describe('MostradorCompraComponent', () => {
  let component: MostradorCompraComponent;
  let fixture: ComponentFixture<MostradorCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostradorCompraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostradorCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

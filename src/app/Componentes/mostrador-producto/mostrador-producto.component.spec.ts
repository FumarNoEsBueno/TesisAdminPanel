import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostradorProductoComponent } from './mostrador-producto.component';

describe('MostradorProductoComponent', () => {
  let component: MostradorProductoComponent;
  let fixture: ComponentFixture<MostradorProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostradorProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostradorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

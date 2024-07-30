import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionHistorialRecepcionComponent } from './gestion-historial-recepcion.component';

describe('GestionHistorialRecepcionComponent', () => {
  let component: GestionHistorialRecepcionComponent;
  let fixture: ComponentFixture<GestionHistorialRecepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionHistorialRecepcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionHistorialRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

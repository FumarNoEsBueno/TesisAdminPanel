import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRecepcionComponent } from './gestion-recepcion.component';

describe('GestionRecepcionComponent', () => {
  let component: GestionRecepcionComponent;
  let fixture: ComponentFixture<GestionRecepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionRecepcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionRecepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

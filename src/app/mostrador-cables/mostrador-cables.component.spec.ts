import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostradorCablesComponent } from './mostrador-cables.component';

describe('MostradorCablesComponent', () => {
  let component: MostradorCablesComponent;
  let fixture: ComponentFixture<MostradorCablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostradorCablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostradorCablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

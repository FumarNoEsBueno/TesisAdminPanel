import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostradorPerifericoComponent } from './mostrador-periferico.component';

describe('MostradorPerifericoComponent', () => {
  let component: MostradorPerifericoComponent;
  let fixture: ComponentFixture<MostradorPerifericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostradorPerifericoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostradorPerifericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

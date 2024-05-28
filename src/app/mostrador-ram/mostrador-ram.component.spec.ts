import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostradorRamComponent } from './mostrador-ram.component';

describe('MostradorRamComponent', () => {
  let component: MostradorRamComponent;
  let fixture: ComponentFixture<MostradorRamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostradorRamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostradorRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

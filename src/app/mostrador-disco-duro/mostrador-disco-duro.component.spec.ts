import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostradorDiscoDuroComponent } from './mostrador-disco-duro.component';

describe('MostradorDiscoDuroComponent', () => {
  let component: MostradorDiscoDuroComponent;
  let fixture: ComponentFixture<MostradorDiscoDuroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostradorDiscoDuroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostradorDiscoDuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

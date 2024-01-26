import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLeavingComponent } from './confirm-leaving.component';

describe('ConfirmLeavingComponent', () => {
  let component: ConfirmLeavingComponent;
  let fixture: ComponentFixture<ConfirmLeavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmLeavingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmLeavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

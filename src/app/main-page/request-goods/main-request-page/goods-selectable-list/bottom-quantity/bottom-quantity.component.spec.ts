import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomQuantityComponent } from './bottom-quantity.component';

describe('BottomQuantityComponent', () => {
  let component: BottomQuantityComponent;
  let fixture: ComponentFixture<BottomQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomQuantityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BottomQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

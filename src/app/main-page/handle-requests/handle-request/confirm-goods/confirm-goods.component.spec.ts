import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmGoodsComponent } from './confirm-goods.component';

describe('ConfirmGoodsComponent', () => {
  let component: ConfirmGoodsComponent;
  let fixture: ComponentFixture<ConfirmGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmGoodsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

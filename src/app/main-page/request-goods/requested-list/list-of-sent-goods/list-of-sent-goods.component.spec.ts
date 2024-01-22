import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSentGoodsComponent } from './list-of-sent-goods.component';

describe('ListOfSentGoodsComponent', () => {
  let component: ListOfSentGoodsComponent;
  let fixture: ComponentFixture<ListOfSentGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfSentGoodsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfSentGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

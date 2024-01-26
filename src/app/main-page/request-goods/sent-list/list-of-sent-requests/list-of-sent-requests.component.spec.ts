import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfSentRequestsComponent } from './list-of-sent-requests.component';

describe('ListOfSentGoodsComponent', () => {
  let component: ListOfSentRequestsComponent;
  let fixture: ComponentFixture<ListOfSentRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfSentRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfSentRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

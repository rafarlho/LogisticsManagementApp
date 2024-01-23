import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfRequestedComponent } from './list-of-requested.component';

describe('ListOfRequestedComponent', () => {
  let component: ListOfRequestedComponent;
  let fixture: ComponentFixture<ListOfRequestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfRequestedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

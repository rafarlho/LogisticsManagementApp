import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedListComponent } from './requested-list.component';

describe('RequestedListComponent', () => {
  let component: RequestedListComponent;
  let fixture: ComponentFixture<RequestedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestedListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

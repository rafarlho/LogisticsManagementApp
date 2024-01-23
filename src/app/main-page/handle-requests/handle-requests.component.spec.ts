import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleRequestsComponent } from './handle-requests.component';

describe('HandleRequestsComponent', () => {
  let component: HandleRequestsComponent;
  let fixture: ComponentFixture<HandleRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandleRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

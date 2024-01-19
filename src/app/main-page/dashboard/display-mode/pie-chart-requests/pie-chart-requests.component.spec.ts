import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartRequestsComponent } from './pie-chart-requests.component';

describe('PieChartRequestsComponent', () => {
  let component: PieChartRequestsComponent;
  let fixture: ComponentFixture<PieChartRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieChartRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PieChartRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

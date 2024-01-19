import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { RequestListComponent } from './display-mode/request-list/request-list.component';
import { PieChartRequestsComponent } from './display-mode/pie-chart-requests/pie-chart-requests.component';
import { RequestsService } from '../../services/requests.service';
import { Subject, takeUntil } from 'rxjs';
import { Request } from '../../models/request.model';
import { LineChartComponent } from './display-mode/line-chart/line-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTabsModule,
    RequestListComponent,
    PieChartRequestsComponent,
    LineChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  requests: Request[] = [];
  private unsubscribe$:Subject<any> = new Subject<any>

  constructor(
    private requestsService:RequestsService
  ){
    this.requestsService.get()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
      
        next:
          (requestObs) =>{
          this.requests = requestObs
          
        },
        error:(err) => console.error(err),
        complete:() => {
        } 
  })
  }

  ngOnDestroy(): void {
    console.log("destroyed")
    this.unsubscribe$.next(true)
  }
}

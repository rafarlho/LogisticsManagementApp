import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RequestListComponent } from './display-mode/request-list/request-list.component';
import { PieChartRequestsComponent } from './display-mode/pie-chart-requests/pie-chart-requests.component';
import { RequestsService } from '../../services/requests.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Request } from '../../models/request.model';
import { LineChartComponent } from './display-mode/line-chart/line-chart.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTabsModule,
    RequestListComponent,
    PieChartRequestsComponent,
    LineChartComponent,
    MatSidenavModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  //Control variables
  requests: Request[] = [];
  private destroy$ = new Subject<void>();
  user$!:Observable<User>

  //Constructor to get current user and requests 
  constructor(
    private requestsService:RequestsService,
    private authService:AuthService,
  ){
    this.user$ = this.authService.getUser()
  }

  //Funtion that return the requests to the child components
  ngOnInit(): void {
    this.requestsService.get()
      .pipe(
        takeUntil(this.destroy$)
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

  //Funtion to clear subscribe so there is no memory leak
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

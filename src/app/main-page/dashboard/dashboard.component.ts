import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { RequestListComponent } from './display-mode/request-list/request-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatTabsModule,
    RequestListComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}

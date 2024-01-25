import { Component } from '@angular/core';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ListOfRequestedComponent } from './list-of-requested/list-of-requested.component';
import { Subject, takeUntil } from 'rxjs';
import { RequestsService } from '../../../services/requests.service';
import { Request } from '../../../models/request.model';
@Component({
  selector: 'app-requested-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ListOfRequestedComponent
  ],
  templateUrl: './requested-list.component.html',
  styleUrl: './requested-list.component.scss'
})
export class RequestedListComponent {
  
  constructor() {
    
  }
  ngOnDestroy(): void {
  }
}
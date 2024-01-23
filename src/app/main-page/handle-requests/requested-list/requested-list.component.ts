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
  requests:Request[] = []
  private destroy$ = new Subject();
  constructor(private requestsService:RequestsService) {
    this.requestsService.get()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next:
          (requestObs) =>{  
            
          this.requests = requestObs
          this.requests = this.requests.filter(request => request.status ===0)
        },
        error:(err) => console.error(err),
        complete:() => {
         
        } 
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.complete();
  }
}
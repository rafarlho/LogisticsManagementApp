import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RequestsService } from '../../../services/requests.service';
import { Request } from '../../../models/request.model';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ListOfSentGoodsComponent } from './list-of-sent-goods/list-of-sent-goods.component';

@Component({
  selector: 'app-requested-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ListOfSentGoodsComponent,
  ],
  templateUrl: './requested-list.component.html',
  styleUrl: './requested-list.component.scss'
})
export class RequestedListComponent {


  requests:Request[] = []
  unsubscribe$:Subject<any> = new Subject<any>()

  constructor(private requestsService:RequestsService) {
    this.requestsService.get()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
      
        next:
          (requestObs) =>{  
            
          this.requests = requestObs
          this.requests = this.requests.filter(request => request.status ===2)
        },
        error:(err) => console.error(err),
        complete:() => {
         
        } 
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true)
  }
  applyFilter(e:Event) {}
}

import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmGoodsComponent } from './confirm-goods/confirm-goods.component';
import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';
import { RequestToCollectService } from '../services/request-to-collect.service';
import { Request } from '../../../models/request.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RequestsService } from '../../../services/requests.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-handle-request',
  standalone: true,
  imports: [
    ConfirmGoodsComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './handle-request.component.html',
  styleUrl: './handle-request.component.scss'
})
export class HandleRequestComponent {
  
  request!:Request
  completedList$!:Observable<boolean>
  constructor(
    private requestToCollect:RequestToCollectService,
    private requestsService:RequestsService,
    private router:Router
    ) {
      this.request = this.requestToCollect.getRequest()
      this.completedList$= this.requestToCollect.completed.asObservable()
  } 

  ngOnInit(): void {
    
  }

  submit() {
    this.request.status=2
    this.request.latestUpdate = (new Date()).toISOString()
    this.requestsService.editStatus(this.request)
      .pipe(
        take(1)
      )
      .subscribe( {
        next: () => this.router.navigateByUrl('/handlerequests/requestedlist'),
        error: err => console.error(err)
      })
  }

  ngOnDestroy(): void {
  }
}

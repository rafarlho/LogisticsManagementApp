import { Component } from '@angular/core';
import { ConfirmGoodsComponent } from './confirm-goods/confirm-goods.component';
import { Observable, Subject, Subscription, take, takeUntil } from 'rxjs';
import { RequestToCollectService } from '../services/request-to-collect.service';
import { Request } from '../../../models/request.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RequestsService } from '../../../services/requests.service';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLeavingComponent } from './confirm-leaving/confirm-leaving.component';
@Component({
  selector: 'app-handle-request',
  standalone: true,
  imports: [
    ConfirmGoodsComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    RouterModule,
  ],
  templateUrl: './handle-request.component.html',
  styleUrl: './handle-request.component.scss'
})
export class HandleRequestComponent {
  leavinToList =false
  leavinToDashboard =false
  request!:Request
  completedList$!:Observable<boolean>
  constructor(
    private requestToCollect:RequestToCollectService,
    private requestsService:RequestsService,
    private router:Router,
    private dialog:MatDialog
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
  confirmLeavingToDashboard() {
    this.leavinToDashboard = true
    this.confirmLeaving()
  }
  confirmLeavingTolist() {
    this.leavinToList = true
    this.confirmLeaving()
  }
  confirmLeaving() {
    let dialog = this.dialog.open(ConfirmLeavingComponent,{data:{valid:false},disableClose:true,width:'600px'})
    dialog.afterClosed().pipe(
      take(1)
    ).subscribe((data:{request:Request,valid:boolean}) => {
      if(data.valid) {
        this.request.status=0
        this.request.handler=''
        this.request.latestUpdate = (new Date()).toISOString()
        this.requestsService.editStatus(this.request)
      .pipe(
        take(1)
      )
      .subscribe( {
        next: () => {
          if(this.leavinToDashboard) this.router.navigateByUrl('')
          if(this.leavinToList) this.router.navigateByUrl("/handlerequests/requestedlist")
        },
        error: err => console.error(err)
      })
      }
    })
  }


  ngOnDestroy(): void {
  }
}

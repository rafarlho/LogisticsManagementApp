import { Component } from '@angular/core';
import { ConfirmGoodsComponent } from './confirm-goods/confirm-goods.component';
import { Observable, take } from 'rxjs';
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
  
  //Control and data variables
  leavinToList =false
  leavinToDashboard =false
  request!:Request
  completedList$!:Observable<boolean>

  //Here gets request to collect and observable for the completed goods list
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

  //After collectiong request and setting it status to sent
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

  //Funtion that handles redirect while collecting
  confirmLeavingToDashboard() {
    this.leavinToDashboard = true
    this.confirmLeaving()
  }

  //Funtion that handles redirect while collecting
  confirmLeavingTolist() {
    this.leavinToList = true
    this.confirmLeaving()
  }

  //Funtion that handles redirect while collecting and sets the request to on collect cleaning teh handler camp
  confirmLeaving() {
    let dialog = this.dialog.open(ConfirmLeavingComponent,{data:{valid:false},disableClose:true,width:'600px'})
    dialog.afterClosed().pipe(
        take(1)
      )
      .subscribe((data:{request:Request,valid:boolean}) => {
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
}

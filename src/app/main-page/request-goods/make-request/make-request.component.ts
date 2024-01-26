import { Component } from '@angular/core';
import { Observable, Subject, Subscription, take, takeUntil, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsSelectableListComponent } from './goods-selectable-list/goods-selectable-list.component';
import { GoodsSelectedListComponent } from './goods-selected-list/goods-selected-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GoodsTransferService } from '../services/goods-transfer.service';
import { Router, RouterModule } from '@angular/router';
import { RequestsService } from '../../../services/requests.service';
import { Request } from '../../../models/request.model';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../models/user.model';
import { RequestDialogComponent } from './request-dialog/request-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-make-request',
  standalone: true,
  imports: [
    GoodsSelectableListComponent,
    GoodsSelectedListComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatSidenavModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './make-request.component.html',
  styleUrl: './make-request.component.scss'
})
export class MakeRequestComponent {

  //Observable to get logged in user
  user$!:Observable<User>
  
  //Data and control variables
  displayedColumns:String[] = ['id','emitter','handler','status','latestUpdate','options']
  dataSource!:MatTableDataSource<Request>;
  private unsubscribe$:Subject<void> = new Subject<void>()

  private subscription!:Subscription

  constructor(
      private goodsTransfer:GoodsTransferService,
      private requestsService:RequestsService,
      private authService:AuthService,
      private dialog:MatDialog,
      private router:Router
  ){  
    this.user$ = this.authService.getUser()
  }
  
  //Apply filter to table from search bar
  applyFilter(event:Event) {
    this.goodsTransfer.setFilter(event)
  }

  //Send a request to the warehouse, setting the status to requested
  sendRequest() {
    const arr = this.goodsTransfer.getGoodList()
    let emitter =""
    this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((user:User) => emitter = user.id) 
    const newR:Request = {
      id: Math.floor(Math.random() * 10000),  
      emitter: emitter,  
      goodsId: arr,
      status: 0,  
      handler: '',
      latestUpdate: new Date().toISOString()
    }
    
    let dialog = this.dialog.open(RequestDialogComponent,{data:{request:newR,valid:false},disableClose:true,width:'600px'});
    
    this.subscription = dialog.afterClosed().subscribe((data:{request:Request,valid:boolean}) => {
      if(data.valid) {
        this.requestsService.add(newR)
          .subscribe({
            next:()=>{},
            error: err => console.error(err),
            complete: ()=>{
              this.router.navigateByUrl('/request/sentlist')
            }
        })
      }
    })
  }

  //On destroy to avoid memory leak
  ngOnDestroy(): void {

    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

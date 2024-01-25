import { Component } from '@angular/core';
import { GoodsService } from '../../../services/goods.service';
import { Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { Good } from '../../../models/good.model';
import { MatTableDataSource } from '@angular/material/table';
import { GoodsSelectableListComponent } from './goods-selectable-list/goods-selectable-list.component';
import { GoodsSelectedListComponent } from './goods-selected-list/goods-selected-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GoodsTransferService } from '../services/goods-transfer.service';
import { RouterModule } from '@angular/router';
import { RequestsService } from '../../../services/requests.service';
import { Request } from '../../../models/request.model';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../models/user.model';
import { RequestDialogComponent } from './request-dialog/request-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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
  ],
  templateUrl: './make-request.component.html',
  styleUrl: './make-request.component.scss'
})
export class MakeRequestComponent {

 
  displayedColumns:String[] = ['id','emitter','handler','status','latestUpdate','options']
  dataSource!:MatTableDataSource<Request>;
  user$!:Observable<User>

 private unsubscribe$:Subject<any> = new Subject<any>
  constructor(
    private goodsTransfer:GoodsTransferService,
    private requestsService:RequestsService,
    private authService:AuthService,
    private dialog:MatDialog
  ){
   
    this.user$ = this.authService.getUser()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true)
  }

  
  applyFilter(event:Event) {
    this.goodsTransfer.setFilter(event)
  }

  sendRequest() {
    const arr = this.goodsTransfer.getGoodList()
    let emmiter =""
    this.user$.pipe(take(1)).subscribe((user:User) => emmiter = user.id) 
    const newR:Request = {
      id: Math.floor(Math.random() * 10000),  
      emitter: emmiter,  
      goodsId: arr,
      status: 0,  
      handler: '',
      latestUpdate: new Date().toISOString()
    }
    let dialog = this.dialog.open(RequestDialogComponent,{data:{request:newR,valid:false},disableClose:true,width:'600px'});
    dialog.afterClosed().subscribe((data:{request:Request,valid:boolean}) => {
      if(data.valid) {
        this.requestsService.add(newR)
          .pipe(take(1))
          .subscribe({
            error: err => console.error(err)
        })
      }
    })
  }
}

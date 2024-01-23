import { Component } from '@angular/core';
import { GoodsService } from '../../../services/goods.service';
import { Subject, takeUntil } from 'rxjs';
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
@Component({
  selector: 'app-main-request-page',
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
  templateUrl: './main-request-page.component.html',
  styleUrl: './main-request-page.component.scss'
})
export class MainRequestPageComponent {

 goods:Good[] = []
 displayedColumns:String[] = ['id','emitter','handler','status','latestUpdate','options']
  dataSource!:MatTableDataSource<Request>;


 private unsubscribe$:Subject<any> = new Subject<any>
  constructor(
    private goodsService:GoodsService,
    private goodsTransfer:GoodsTransferService,
    private requestsService:RequestsService
  ){
    this.goodsService.get()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
      
        next:
          (goodsObs) =>{
          this.goods = goodsObs
          
        },
        error:(err) => console.error(err),
        complete:() => {
          console.log(this.goods)
        } 
    })
  }



  ngOnDestroy(): void {
    this.unsubscribe$.next(true)
  }

  
  applyFilter(event:Event) {
    this.goodsTransfer.setFilter(event)
  }

  sendRequest() {
    const arr = this.goodsTransfer.getGoodList()
    const newR:Request = {
      id: 5623,  
      emitter: 'emitterUserId',  
      goodsId: arr,
      status: 0,  
      handler: 'defaultHandlerId',
      latestUpdate: new Date().toISOString()
    }
    console.log("aqui ",arr, "newR: ",newR)
    this.requestsService.add(newR)
      .subscribe({
        next: (r) =>console.log(r),
        error: err => console.error(err)
      })
  }
}

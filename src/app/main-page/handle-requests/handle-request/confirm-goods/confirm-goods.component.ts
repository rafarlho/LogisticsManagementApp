import { Component, Input, ViewChild } from '@angular/core';
import { RequestToCollectService } from '../../requested-list/services/request-to-collect.service';
import { Subscription } from 'rxjs';
import { Request } from '../../../../models/request.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-goods',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './confirm-goods.component.html',
  styleUrl: './confirm-goods.component.scss'
})
export class ConfirmGoodsComponent {

  request!:Request 
  goodsAndQuantity:{id:string,quantity:number,verified:boolean}[] = []
  completedList:boolean = false
  @ViewChild(MatPaginator) paginator!:MatPaginator
  
  displayedColumns:String[] = ['id','quantity','options']
  dataSource!:MatTableDataSource<{id:string,quantity:number,verified:boolean}>;
  private subscription!: Subscription;
  

  constructor(
    private requestToCollect:RequestToCollectService,
  ) {}


  ngOnInit(): void {
    this.request = this.requestToCollect.getRequest()
    this.goodsAndQuantity = this.request.goodsId.map(good => ({ id: good.id, quantity: good.quantity, verified: false }))
    console.log(this.goodsAndQuantity)
    this.refreshTableData()
  }

  confirmGood(id:string,quantity:number){
    const found = this.goodsAndQuantity.find((good) => good.id === id && good.quantity===quantity)
    if(found) {
      found.verified=true
    }
    if(this.goodsAndQuantity.find(good=>good.verified === false) ===undefined) {
      this.completedList=true
    }
  }
  cancelGood(id:string,quantity:number){
    const found = this.goodsAndQuantity.find((good) => good.id === id && good.quantity===quantity)
    if(found) {
      found.verified=false
      this.completedList=false
    }
  }


  ngOnDestroy() {
    console.log("destroyed")
    this.subscription.unsubscribe();
  }

  refreshTableData() {
      this.dataSource = new MatTableDataSource(this.goodsAndQuantity)
      this.dataSource.paginator = this.paginator
    
  }
}

import { Component, Input, ViewChild } from '@angular/core';
import { RequestToCollectService } from '../../services/request-to-collect.service';
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

  //Control variables
  completedList:boolean = false
  @ViewChild(MatPaginator) paginator!:MatPaginator

  //Data variables
  request!:Request 
  goodsAndQuantity:{id:string,quantity:number,verified:boolean}[] = []
  displayedColumns:String[] = ['id','quantity','options']
  dataSource!:MatTableDataSource<{id:string,quantity:number,verified:boolean}>;

  constructor(
    private requestToCollect:RequestToCollectService,
  ) {}

  //On init gets the request to collect
  ngOnInit(): void {
    this.request = this.requestToCollect.getRequest()
    this.goodsAndQuantity = this.request.goodsId.map(good => ({ id: good.id, quantity: good.quantity, verified: false }))
    this.refreshTableData()
  }

  //Function called when a good it ticked true, also enables the submit button when fully ticked
  confirmGood(id:string,quantity:number){
    const found = this.goodsAndQuantity.find((good) => good.id === id && good.quantity===quantity)
    if(found) {
      found.verified=true
    }
    if(this.goodsAndQuantity.find(good=>good.verified === false) ===undefined) {
      this.requestToCollect.completedRequest()
    }
  }
  
  //Function called when a good it ticked false, also disables the submit button if enabled
  cancelGood(id:string,quantity:number){
    const found = this.goodsAndQuantity.find((good) => good.id === id && good.quantity===quantity)
    if(found) {
      found.verified=false
      this.requestToCollect.incompletedRequest()
    }
  }

  //Funtion that updates table data
  refreshTableData() {
      this.dataSource = new MatTableDataSource(this.goodsAndQuantity)
      this.dataSource.paginator = this.paginator
    
  }
}

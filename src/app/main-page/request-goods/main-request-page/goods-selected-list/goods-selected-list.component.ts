import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Good } from '../../../../models/good.model';
import { Subscription } from 'rxjs';
import { GoodsTransferService } from '../../services/goods-transfer.service';

@Component({
  selector: 'app-goods-selected-list',
  standalone: true,
  imports: [    
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule],
  templateUrl: './goods-selected-list.component.html',
  styleUrl: './goods-selected-list.component.scss'
})
export class GoodsSelectedListComponent {
  @ViewChild(MatPaginator) paginator!:MatPaginator
  
  displayedColumns:String[] = ['id','quantity','options']
  dataSource!:MatTableDataSource<{id:string,quantity:number}>;
  private subscription!: Subscription;
  
  goodsAndQuantity:{id:string,quantity:number}[] = []

  constructor(
    private goodTransferService:GoodsTransferService
  ) {}
  ngOnInit(): void {
    this.subscription = this.goodTransferService.quantityAndId.subscribe((value)=>{
      console.log(value)
      if(value)this.goodsAndQuantity.push({id:value.id,quantity:value.quantity})
      this.dataSource = new MatTableDataSource(this.goodsAndQuantity)
      this.dataSource.paginator = this.paginator
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { Component, Input, ViewChild } from '@angular/core';
import { Good } from '../../../../models/good.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { BottomQuantityComponent } from './select-quantity/bottom-quantity.component';
import { GoodsTransferService } from '../../services/goods-transfer.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, Subscription, pipe, takeUntil } from 'rxjs';
import { GoodsService } from '../../../../services/goods.service';
@Component({
  selector: 'app-goods-selectable-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './goods-selectable-list.component.html',
  styleUrl: './goods-selectable-list.component.scss'
})
export class GoodsSelectableListComponent {
  @ViewChild(MatPaginator) paginator!:MatPaginator
  
  enableQuant:boolean=false 
  goods$!:Observable<Good[]>
  goods:Good[] = []
  displayedColumns:String[] = ['id','description','options']
  dataSource!:MatTableDataSource<Good>;
  private unsubscribe$:Subject<any> = new Subject<any>();

  constructor(
    private dialog: MatDialog,
    private goodTransferService:GoodsTransferService,
    private goodsService:GoodsService
    ) {

  }

  ngOnInit(): void {
    this.goods$ = this.goodsService.get()
    this.goods$
      .pipe(takeUntil(this.unsubscribe$))  
      .subscribe((goods) => {
        this.goods = goods
        this.dataSource =  new MatTableDataSource(this.goods)
        this.dataSource.paginator = this.paginator
      })
    this.goodTransferService.filterTransfered
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((e:Event) =>{
        const target = e.target as HTMLInputElement
        this.dataSource.filter=target.value.trim().toLowerCase()
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    })
    
  }

  enableQuantity(good:Good) {
    let dialog = this.dialog.open(BottomQuantityComponent,{data:good,disableClose:true,width:'600px'});
    dialog.afterClosed().subscribe((result:{id:string,quantity:number}) => {
      if(result) {
        this.goodTransferService.sendQuantity(result.id,result.quantity)
      }
    })
  }

  ngOnDestroy(): void {
    console.log("destroyed")
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }
  
}


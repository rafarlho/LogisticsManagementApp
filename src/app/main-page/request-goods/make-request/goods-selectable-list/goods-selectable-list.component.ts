import { Component, Input, ViewChild } from '@angular/core';
import { Good } from '../../../../models/good.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { QuantityDialogComponent } from './select-quantity/quantity-dialog.component';
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
  
  //Control variables
  @ViewChild(MatPaginator) paginator!:MatPaginator
  enableQuant:boolean=false 
  private unsubscribe$:Subject<void> = new Subject<void>();
  
  //Data variables
  goods$!:Observable<Good[]>
  goods:Good[] = []
  displayedColumns:String[] = ['id','description','options']
  dataSource!:MatTableDataSource<Good>;


  constructor(
    private dialog: MatDialog,
    private goodTransferService:GoodsTransferService,
    private goodsService:GoodsService
    ) {
  }

  //On init gets goods from backend and handles filter change
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

  //Opens dialog to select quantity
  enableQuantity(good:Good) {
    let dialog = this.dialog.open(QuantityDialogComponent,{data:good,disableClose:true,width:'600px'});
    dialog.afterClosed().subscribe((result:{id:string,quantity:number}) => {
      if(result) {
        this.goodTransferService.sendQuantity(result.id,result.quantity)
      }
    })
  }

  //On destroy to avoid memory leak
  //ngOnDestroy(): void {
  //  console.log("goods to select destroyed")
  //  this.unsubscribe$.next()
  //  this.unsubscribe$.complete()
  //}
  
}


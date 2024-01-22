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
import { Subscription } from 'rxjs';
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
  @Input() goods:Good[] = []
  @ViewChild(MatPaginator) paginator!:MatPaginator
  
  enableQuant:boolean=false 
  
  displayedColumns:String[] = ['id','description','options']
  dataSource!:MatTableDataSource<Good>;
  private subscription  !: Subscription;

  constructor(
    private dialog: MatDialog,
    private goodTransferService:GoodsTransferService
    ) {

  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.dataSource =  new MatTableDataSource(this.goods)
      this.dataSource.paginator = this.paginator
    },1000)
    this.subscription = this.goodTransferService.filterTransfered.subscribe((e:Event) =>{
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}


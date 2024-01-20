import { Component, Input, ViewChild } from '@angular/core';
import { Good } from '../../../../models/good.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { BottomQuantityComponent } from './bottom-quantity/bottom-quantity.component';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { GoodsTransferService } from '../../services/goods-transfer.service';
import { MatDialog } from '@angular/material/dialog';
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
    MatBottomSheetModule,
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

  constructor(
    private _dialog: MatDialog,
    private goodTransferService:GoodsTransferService
    ) {

  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.dataSource =  new MatTableDataSource(this.goods)
      this.dataSource.paginator = this.paginator
    },1000)
    
  }

  enableQuantity(good:Good) {
    let dialog = this._dialog.open(BottomQuantityComponent,{data:good,disableClose:true,width:'600px'});
    dialog.afterClosed().subscribe((result:{id:string,quantity:number}) => {
      if(result) {
        this.goodTransferService.sendQuantity(result.id,result.quantity)
      }
    })
  }
}

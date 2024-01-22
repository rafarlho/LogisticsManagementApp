import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Good } from '../../../../models/good.model';
import { Subscription } from 'rxjs';
import { GoodsTransferService } from '../../services/goods-transfer.service';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ChangeValuesDialogComponent } from './change-values-dialog/change-values-dialog.component';

@Component({
  selector: 'app-goods-selected-list',
  standalone: true,
  imports: [    
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
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
    private goodTransferService:GoodsTransferService,
    private dialog:MatDialog
  ) {}
  ngOnInit(): void {
    this.subscription = this.goodTransferService.quantityAndId.subscribe((value)=>{
      if(value) {
        if(this.goodsAndQuantity.some(item => item.id ===value.id)) {
          this.openWarningDialog(value.id,value.quantity)
        }
        else {
          this.goodsAndQuantity.push({id:value.id,quantity:value.quantity})
          this.refreshTableData()
        }
      }
    })
    this.subscription = this.goodTransferService.filterTransfered.subscribe((e:Event) =>{
      const target = e.target as HTMLInputElement
      this.dataSource.filter=target.value.trim().toLowerCase()
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    })
  }

  deleteGood(id:string,quantity:number){
    let dialog = this.dialog.open(DeleteDialogComponent,{data:{id:id,quantity:quantity,valid:false},disableClose:true,width:'600px'});
    dialog.afterClosed().subscribe((data:{id:string,quantity:number,valid:boolean}) => {
      if(data.valid) {
        this.goodsAndQuantity =  this.goodsAndQuantity.filter(item => id!== item.id)
        this.refreshTableData()
      }
    })
  }

  editGood(id:string,quantity:number){
    let dialog = this.dialog.open(ChangeValuesDialogComponent,{data:{id:id,quantity:quantity},disableClose:true,width:'600px'});
    dialog.afterClosed().subscribe((data:{id:string,quantity:number}) => {
      if(data) {
        this.goodsAndQuantity =  this.goodsAndQuantity.filter(item => id!== item.id)
        this.goodsAndQuantity.push({id:id,quantity:data.quantity})
        this.refreshTableData()
      }
    })
  }

  openWarningDialog(id:string,quantity:number) {
    let dialog = this.dialog.open(WarningDialogComponent,{disableClose:true,width:'600px'});
    dialog.afterClosed().subscribe((data:boolean) => {
      if(data) {
        this.goodsAndQuantity =  this.goodsAndQuantity.filter(item => id!== item.id)
        this.goodsAndQuantity.push({id:id,quantity:quantity})
        this.refreshTableData()
      }
    })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  refreshTableData() {
    this.dataSource = new MatTableDataSource(this.goodsAndQuantity)
    this.dataSource.paginator = this.paginator
  }
}

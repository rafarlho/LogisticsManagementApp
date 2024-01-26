import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GoodsTransferService } from '../../services/goods-transfer.service';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ChangeValuesDialogComponent } from './change-values-dialog/change-values-dialog.component';
import { Subject, takeUntil } from 'rxjs';

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
  //Control variables
  @ViewChild(MatPaginator) paginator!:MatPaginator
  private unsubscribe$:Subject<void> = new Subject<void>()
  
  //Data variables
  displayedColumns:String[] = ['id','quantity','options']
  dataSource!:MatTableDataSource<{id:string,quantity:number}>;
  goodsAndQuantity:{id:string,quantity:number}[] = []
  

  constructor(
    private goodTransferService:GoodsTransferService,
    private dialog:MatDialog
  ) {}

  //On init gets the good list to handle and handles the search filter
  ngOnInit(): void {
   this.goodTransferService.quantityAndId
    .pipe(takeUntil(this.unsubscribe$))   
    .subscribe((value)=>{
      if(value) {
        if(this.goodsAndQuantity.some(item => item.id ===value.id)) {
          this.openWarningDialog(value.id,value.quantity)
        }
        else {
          this.goodsAndQuantity.push({id:value.id,quantity:value.quantity})
          this.goodTransferService.setGoodList(this.goodsAndQuantity)
          this.refreshTableData()
          
        }
      }
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

  //Opens delete good confirmation dialog
  deleteGood(id:string,quantity:number){
    let dialog = this.dialog.open(DeleteDialogComponent,{data:{id:id,quantity:quantity,valid:false},disableClose:true,width:'600px'});
    dialog.afterClosed().subscribe((data:{id:string,quantity:number,valid:boolean}) => {
      if(data.valid) {
        this.goodsAndQuantity =  this.goodsAndQuantity.filter(item => id!== item.id)
        this.refreshTableData()
      }
    })
  }
  
  //Opens edit good quantity dialog
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

  //Opens repeated inserted item dialog
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

  //Updates table data
  refreshTableData() {
    this.dataSource = new MatTableDataSource(this.goodsAndQuantity)
    this.dataSource.paginator = this.paginator
  }

  //On destroy to avoid memory leak
  //ngOnDestroy() {
  //  console.log("goods selected destroyed")
  //  this.unsubscribe$.unsubscribe();
  //  this.unsubscribe$.complete()
  //}
}

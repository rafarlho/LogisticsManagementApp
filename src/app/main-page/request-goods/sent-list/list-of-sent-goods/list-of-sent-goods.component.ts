import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Request } from '../../../../models/request.model';
import { GoodsTransferService } from '../../services/goods-transfer.service';
import { RequestsService } from '../../../../services/requests.service';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-of-sent-goods',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './list-of-sent-goods.component.html',
  styleUrl: './list-of-sent-goods.component.scss'
})
export class ListOfSentGoodsComponent {

  @ViewChild(MatPaginator) paginator!:MatPaginator
  requests$!:Observable<Request[]>
  unsubscribe$:Subject<any> = new Subject<any>()
  displayedColumns:String[] = ['id','emitter','handler','latestUpdate','goods','options']
  dataSource!:MatTableDataSource<Request>;
  requests:Request[] = []
  
  constructor(
    private goodsTransferService:GoodsTransferService,
    private requestsService:RequestsService,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {
    console.log("oninit sent")
    this.requests$ = this.requestsService.get()
    this.requests$
      .pipe(takeUntil(this.unsubscribe$))  
      .subscribe((requests) => {
        this.requests = requests.filter(request => request.status ===2)
        this.dataSource =  new MatTableDataSource(this.requests)
        this.dataSource.paginator = this.paginator
      })
   

    this.goodsTransferService.filterTransfered
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((e:Event) =>{
        const target = e.target as HTMLInputElement
        this.dataSource.filter=target.value.trim().toLowerCase()
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      })
  }

  confirmReception(request:Request) {
    let dialog = this.dialog.open(ConfirmDialogComponent,{data:{request:request,valid:false},disableClose:true,width:'600px'});
    dialog.afterClosed().subscribe((data:{request:Request,valid:boolean}) => {
      if(data.valid) {
        request.status = 3
        this.requestsService.editStatus(request)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe( {
            next:()=>this.updateData(),
            error: err => console.error(err)
        })
      }
    })
  }

  updateData(){
    this.requests$ = this.requestsService.get()
    this.requests$
      .pipe(take(1))  
      .subscribe((requests) => {
        this.requests = requests.filter(request => request.status ===2)
        this.dataSource =  new MatTableDataSource(this.requests)
        this.dataSource.paginator = this.paginator
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }
}

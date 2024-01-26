import { CommonModule, DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
  selector: 'app-list-of-sent-requests',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './list-of-sent-requests.component.html',
  styleUrl: './list-of-sent-requests.component.scss'
})
export class ListOfSentRequestsComponent {

  //Control variables
  @ViewChild(MatPaginator) paginator!:MatPaginator
  unsubscribe$:Subject<void> = new Subject<void>()
  
  //Data variables
  requests$!:Observable<Request[]>
  displayedColumns:String[] = ['id','emitter','handler','latestUpdate','goods','options']
  dataSource!:MatTableDataSource<Request>;
  requests:Request[] = []
  
  constructor(
    private goodsTransferService:GoodsTransferService,
    private requestsService:RequestsService,
    private dialog:MatDialog
  ) {}

  //On init gets list of requests and handles the search filter
  ngOnInit(): void {
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
        var filterValue =target.value.trim().toLowerCase()
        this.dataSource.filterPredicate = (data:Request,filter:string) =>{
          return data.id.toString().includes(filter) ||
            data.handler?.toLowerCase().includes(filter) ||
            data.emitter.toLowerCase().includes(filter)
        }
        this.dataSource.filter=filterValue
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      })
  }

  //Method that handles the confirmation of the reception of a sent request
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

  //Funtion tha retrieves data from backend updating the values
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

  //On destroy to avoid memory leakes
  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Request } from '../../../../models/request.model';
import { GoodsTransferService } from '../../services/goods-transfer.service';
import { RequestsService } from '../../../../services/requests.service';

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

  displayedColumns:String[] = ['id','emitter','handler','latestUpdate','goods','options']
  dataSource!:MatTableDataSource<Request>;
  @Input() requests!:Request[]
  
  constructor(
    private goodsTransferService:GoodsTransferService,
    private requestsService:RequestsService
  ) {}

  ngOnInit(): void {
    setTimeout(()=>{
      console.log(this.requests)
      this.dataSource =  new MatTableDataSource(this.requests)
      this.dataSource.paginator = this.paginator
    },1000)

    this.goodsTransferService.filterTransfered.subscribe((e:Event) =>{
      const target = e.target as HTMLInputElement
      this.dataSource.filter=target.value.trim().toLowerCase()
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    })
  }

  confirmReception(request:Request) {
    request.status = 3
    this.requestsService.editStatus(request)
    .subscribe( {
      next: (r) =>console.log(r),
      error: err => console.error(err)
    })
  }
}

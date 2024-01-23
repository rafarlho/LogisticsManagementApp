import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Request } from '../../../../models/request.model';
import { MatButtonModule } from '@angular/material/button';
import { RequestToCollectService } from '../services/request-to-collect.service';
import { RouterModule } from '@angular/router';
import { RequestsService } from '../../../../services/requests.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-list-of-requested',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    DatePipe,
    CommonModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './list-of-requested.component.html',
  styleUrl: './list-of-requested.component.scss'
})
export class ListOfRequestedComponent {

  private destroy$ = new Subject();
  @ViewChild(MatPaginator) paginator!:MatPaginator

  displayedColumns:String[] = ['id','emitter','latestUpdate','goods','options']
  dataSource!:MatTableDataSource<Request>;
  @Input() requests!:Request[]
  
  constructor(private requestToCollect:RequestToCollectService,
    private requestsService:RequestsService
    ){}
  ngOnInit(): void {
    setTimeout(()=>{
      console.log(this.requests)
      this.dataSource =  new MatTableDataSource(this.requests)
      this.dataSource.paginator = this.paginator
    },1000)
  }

  collectRequest(request:Request) {
    this.requestToCollect.setRequest(request)
    request.handler = "asdas"
    request.status = 1
    this.requestsService.editToOnCollection(request)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe( {
        next: (r) =>console.log(r),
        error: err => console.error(err)
      })
  }


  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.complete();
  }
}

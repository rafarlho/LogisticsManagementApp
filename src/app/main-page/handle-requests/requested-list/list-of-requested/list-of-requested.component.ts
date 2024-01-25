import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Request } from '../../../../models/request.model';
import { MatButtonModule } from '@angular/material/button';
import { RequestToCollectService } from '../../services/request-to-collect.service';
import { Router, RouterModule } from '@angular/router';
import { RequestsService } from '../../../../services/requests.service';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth.service';
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

  private unsubscribe$ = new Subject();
  @ViewChild(MatPaginator) paginator!:MatPaginator

  displayedColumns:String[] = ['id','emitter','latestUpdate','goods','options']
  dataSource!:MatTableDataSource<Request>;
  requests:Request[] =[]
  requests$!:Observable<Request[]>
  
  constructor(private requestToCollect:RequestToCollectService,
    private requestsService:RequestsService,
    private authService:AuthService,
    private router:Router
    ){}
  ngOnInit(): void {
    this.requests$ = this.requestsService.get()
    this.requests$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((requests) =>{        
        this.requests = requests.filter(request => request.status ===0)
        this.dataSource = new MatTableDataSource(this.requests);
        this.dataSource.paginator = this.paginator;
      })
  }

  collectRequest(request:Request) {
    this.requestToCollect.setRequest(request)
    this.router.navigateByUrl('/handlerequests/handlerequest')
    let handler = '' 
    this.authService.getUser().pipe(take(1)).subscribe((logedInUser) => {handler = logedInUser.id})
    request.handler = handler 
    request.status = 1
    this.requestsService.editToOnCollection(request)
      .pipe(
        take(1)
      )
      .subscribe( {
        error: err => console.error(err)
      })
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next(false);
    this.unsubscribe$.complete();
  }
}

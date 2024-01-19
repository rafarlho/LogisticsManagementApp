import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Request, Status } from '../../../../models/request.model';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RequestsService } from '../../../../services/requests.service';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';
import { RequestInfoComponent } from './request-info/request-info.component';
import {Sort, MatSortModule, SortDirection} from '@angular/material/sort';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    DatePipe,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    MatRadioModule,
    MatSortModule,
    
  ],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss'
})
export class RequestListComponent {

  @ViewChild(MatPaginator) paginator!:MatPaginator

  status!:boolean
  date!:boolean
  sort!:number

  statusList=["Requested","On Collection","Sent","Recieved"]
  dateList=["Most recent first","Oldest first"]
  
  displayedColumns:String[] = ['id','emitter','handler','status','latestUpdate','options']
  dataSource!:MatTableDataSource<Request>;
  
  requests: Request[] = [];
  sortedRequests = this.requests.slice()

  private unsubscribe$:Subject<any> = new Subject<any>

  constructor(
    private requestsService:RequestsService,
    private dialog:MatDialog
  ){
    this.requestsService.get()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
      
        next:
          (requestObs) =>{
          this.requests = requestObs
          
        },
        error:(err) => console.error(err),
        complete:() => {
          this.dataSource = new MatTableDataSource(this.requests)
          this.dataSource.paginator = this.paginator
        } 
  })
  }
  
  ngOnInit(): void {
  }
    
  applyFilter(event:Event) {
    const target = event.target as HTMLInputElement
    this.dataSource.filter=target.value.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleStatusChange(e:MatRadioChange){
    this.dataSource.filterPredicate = function(data,filter:string) {
      return data.status.toString().includes(filter)
    } 
    this.dataSource.filter = e.value
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 
  
  handleDateChange(e:MatRadioChange) {
    let order:SortDirection = ""
      if(e.value===1) order="asc"
      if(e.value===2) order="desc"
      this.sortData({ active: 'latestUpdate', direction: order });

  }

  disableFilter(e:MatSlideToggleChange) {
    if(!e.checked) {
        this.dataSource = new MatTableDataSource(this.requests)
        this.dataSource.paginator = this.paginator
    }
  }

  handleRequester(s:string) {
    if(s) return s
    return "Not handled yet"
  }

  numberToStatus(n:number) {
    switch(n) {
      case 0:
        return "Requested"
      case 1:
        return "On Collection"
      case 2:
        return "Sent"
      case 3:
        return "Recieved"
      default:
        return "Undefined"   
    }
  }

  openDialog(r:Request) {
    this.dialog.open(RequestInfoComponent,{data:r})
  }

  sortData(sort: Sort) {
    const data = this.requests.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedRequests = data;
    }

    this.sortedRequests = data.sort((a, b) => {
      if (sort.active === 'latestUpdate') {
        const isAsc = sort.direction === "asc";
        return this.compare(new Date(a.latestUpdate), new Date(b.latestUpdate), isAsc);
      } else {
        return 0;
      }
    });

    this.dataSource = new MatTableDataSource(this.sortedRequests);
    this.dataSource.paginator = this.paginator
  }

  compare(a: Date, b: Date, isAsc: boolean) {
    const timeA = a.getTime();
    const timeB = b.getTime();
    return (timeA < timeB ? -1 : 1) * (isAsc ? 1 : -1);
  }



  ngOnDestroy(): void {
    console.log("destroyed")
    this.unsubscribe$.next(true)
  }
} 

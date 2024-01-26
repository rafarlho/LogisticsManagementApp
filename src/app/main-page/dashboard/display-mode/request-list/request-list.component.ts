import { Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Request } from '../../../../models/request.model';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RequestsService } from '../../../../services/requests.service';
import { Observable, Subject, take, takeUntil } from 'rxjs';
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
    FormsModule,
    MatRadioModule,
    MatSortModule,
    
  ],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss'
})
export class RequestListComponent {
  //Control variables for sorters 
  dateFilter:number= -1
  statusFilter:number= -1 
  statusList=["Requested","On Collection","Sent","Recieved"]
  dateList=["Most recent first","Oldest first"]
  
  //Variables for table
  @ViewChild(MatPaginator) paginator!:MatPaginator
  displayedColumns:String[] = ['id','emitter','handler','status','latestUpdate','options']
  dataSource!:MatTableDataSource<Request>;
  
  //Data variables and observables/subcriptions
  requests$!:Observable<Request[]>
  requests: Request[] = [];
  sortedRequests = this.requests.slice()
  private unsubscribe$:Subject<any> = new Subject<any>

  constructor(
    private dialog:MatDialog,
    private requestsService:RequestsService
  ){
    
  }
  //Retrieves information from service and updates it
  ngOnInit(): void {
    this.requests$ = this.requestsService.get()
    this.requests$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((requests) =>{
        this.requests = requests;
        this.dataSource = new MatTableDataSource(this.requests);
        this.dataSource.paginator = this.paginator;
      })
  }

  //Funtion to return table to normal after a filter was applied
  disableFilter(e:MatSlideToggleChange) {
    if(!e.checked) {
        this.dataSource = new MatTableDataSource(this.requests)
        this.dataSource.paginator = this.paginator
    }
  }

  //Funtion that returns a string if a request was not handled
  handleRequester(s:string) {
    if(s) return s
    return "Not handled yet"
  }
  //Funtion that returns a string for each status
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

  //Funtion to open the dialog with detailed information about a specific request
  openDialog(r:Request) {
    this.dialog.open(RequestInfoComponent,{data:r,width:'600px'})
  } 
  
  //Funtion to handle search input filter
  applyTextFilter(event:Event) {
    const target = event.target as HTMLInputElement
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
  }
  
  //Funtion to apply status and date filter
  applyFilter() {
    let filteredData = this.requests.slice();
    if(this.statusFilter!=-1) {
      filteredData = filteredData.filter(request => request.status === this.statusFilter);
    }

    if(this.dateFilter!=-1) {
      let order:SortDirection = ""
      if(this.dateFilter===1) order="asc"
      if(this.dateFilter===0) order="desc"
      console.log(order)
      this.sortData(filteredData,{ active: 'latestUpdate', direction: order });
    }

    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.paginator = this.paginator;

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }
  
  //Funtion to handle status sorter
  handleStatusChange(e:MatRadioChange){
    this.statusFilter = e.value
    this.applyFilter()
  } 
 
  //Funtion to handle date sorter
  handleDateChange(e:MatRadioChange) {
    this.dateFilter = e.value
    this.applyFilter()
  }

  //Sub-Funtion to sor the table by date
  sortData(data:Request[],sort: Sort) {
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
  //Funtion that compares two dates
  compare(a: Date, b: Date, isAsc: boolean) {
    const timeA = a.getTime();
    const timeB = b.getTime();
    return (timeA < timeB ? -1 : 1) * (isAsc ? 1 : -1);
  }
  
  //Funtion to clear filter
  removeFilters() {
    this.dateFilter = -1
    this.statusFilter = -1
    this.applyFilter()
    this.clearRadioOptions()
  }
  
  //Funtion to clear radio buttons selection
  clearRadioOptions() {
    var statusGroup = document.getElementsByName('statusRadioGroup') as NodeListOf<HTMLInputElement>
    statusGroup.forEach((radio:HTMLInputElement)=> {
      radio.checked = false
    }) 
    var dateGroup = document.getElementsByName('dateRadioGroup') as NodeListOf<HTMLInputElement>
    dateGroup.forEach((radio:HTMLInputElement)=> {
      radio.checked = false
    })
  }

  //On destroy method to unsubscribe all subscriptions
  ngOnDestroy(): void {
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }
} 

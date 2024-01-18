import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Request, Status } from '../../../../models/request.model';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RequestsService } from '../../../../services/requests.service';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';

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
  private unsubscribe$:Subject<any> = new Subject<any>

  constructor(
    private requestsService:RequestsService
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
        complete:() => console.log("Complete!") 
  })
  }
  
  ngOnInit(): void {
    setTimeout(()=>{
      console.log("asdasd " , this.requests)
      this.dataSource = new MatTableDataSource(this.requests)
      this.dataSource.paginator = this.paginator
    } ,2000
      )
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
    
    handleDateChange(e:MatRadioChange){
      console.log("olé ",e.value)
    }

    disableFilter(e:MatSlideToggleChange) {
      if(!e.checked) {
        this.dataSource.filterPredicate = function(data,filter:string) {
          return data.status.toString().includes(filter) ||
              data.emitter.toLowerCase().includes(filter)
          } 
      }
    }

  ngOnDestroy(): void {
    console.log("destroyed")
    this.unsubscribe$.next(true)
  }
} 

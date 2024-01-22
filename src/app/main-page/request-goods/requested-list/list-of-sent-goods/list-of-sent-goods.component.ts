import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Request } from '../../../../models/request.model';

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
  

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout(()=>{
      console.log(this.requests)
      this.dataSource =  new MatTableDataSource(this.requests)
      this.dataSource.paginator = this.paginator
    },1000)
  }

 
}

import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Good } from '../../../../models/good.model';

@Component({
  selector: 'app-goods-selected-list',
  standalone: true,
  imports: [    
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule],
  templateUrl: './goods-selected-list.component.html',
  styleUrl: './goods-selected-list.component.scss'
})
export class GoodsSelectedListComponent {
  @ViewChild(MatPaginator) paginator!:MatPaginator
  
  displayedColumns:String[] = ['id','description','options']
  dataSource!:MatTableDataSource<Good>;

  good1:Good = {
    id:"123",
    description:"asd"
  } 
  dummyData = [this.good1,this.good1]

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.dataSource = new MatTableDataSource()
    this.dataSource.paginator = this.paginator
  }
}

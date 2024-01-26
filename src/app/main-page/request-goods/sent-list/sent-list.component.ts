import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { ListOfSentRequestsComponent } from './list-of-sent-requests/list-of-sent-requests.component';
import { RouterModule } from '@angular/router';
import { GoodsTransferService } from '../services/goods-transfer.service';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-sent-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ListOfSentRequestsComponent,
    RouterModule,
    MatSidenavModule,
  ],
  templateUrl: './sent-list.component.html',
  styleUrl: './sent-list.component.scss'
})
export class SentListComponent {


  constructor(
    private goodsTransferService:GoodsTransferService,

  ) {
  }

  //Method to communicate search filter
  applyFilter(e:Event) {
    this.goodsTransferService.setFilter(e)
  }
}

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RequestsService } from '../../../services/requests.service';
import { Request } from '../../../models/request.model';
import { Observable, Subject,takeUntil } from 'rxjs';
import { ListOfSentGoodsComponent } from './list-of-sent-goods/list-of-sent-goods.component';
import { RouterModule } from '@angular/router';
import { GoodsTransferService } from '../services/goods-transfer.service';

@Component({
  selector: 'app-sent-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ListOfSentGoodsComponent,
    RouterModule,

  ],
  templateUrl: './sent-list.component.html',
  styleUrl: './sent-list.component.scss'
})
export class SentListComponent {
  
  constructor(
    private goodsTransferService:GoodsTransferService
    ) {
   
  }
  applyFilter(e:Event) {
    this.goodsTransferService.setFilter(e)
  }
}

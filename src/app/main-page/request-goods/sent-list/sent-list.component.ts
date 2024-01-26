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
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../auth/services/auth.service';

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
    MatSidenavModule,
    CommonModule,

  ],
  templateUrl: './sent-list.component.html',
  styleUrl: './sent-list.component.scss'
})
export class SentListComponent {
  user$!:Observable<User>


  constructor(
    private goodsTransferService:GoodsTransferService,
    private authService:AuthService,
  ) {
    this.user$ = this.authService.getUser()
  }
  applyFilter(e:Event) {
    this.goodsTransferService.setFilter(e)
  }
}

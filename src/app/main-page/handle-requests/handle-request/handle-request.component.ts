import { ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmGoodsComponent } from './confirm-goods/confirm-goods.component';
import { Subscription } from 'rxjs';
import { RequestToCollectService } from '../requested-list/services/request-to-collect.service';
import { Request } from '../../../models/request.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-handle-request',
  standalone: true,
  imports: [
    ConfirmGoodsComponent,
    CommonModule,
  ],
  templateUrl: './handle-request.component.html',
  styleUrl: './handle-request.component.scss'
})
export class HandleRequestComponent {
  
  subscription!:Subscription
  request!:Request
  loaded:boolean = false
  constructor(
  ) {
    
  }

  ngOnInit(): void {
   
  }
}

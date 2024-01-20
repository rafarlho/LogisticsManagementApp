import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Request } from '../../../../../models/request.model';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-info',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
  ],
  templateUrl: './request-info.component.html',
  styleUrl: './request-info.component.scss'
})
export class RequestInfoComponent {

  handled:string="Not handled yet"
  constructor(
    @Inject(MAT_DIALOG_DATA) public request:Request
  ) {}

    ngOnInit(): void {
      if(this.request.handler) this.handled = this.request.handler
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
}





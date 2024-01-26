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
  //String if request is not handled
  handled:string="Not handled yet"

  constructor(
    @Inject(MAT_DIALOG_DATA) public request:Request
  ) {}
  
  //Verifies if request has handler, if not assgin the previous string
  ngOnInit(): void {
    if(this.request.handler) this.handled = this.request.handler
  }

  //Funtion that returns a string for each request status
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






import { EventEmitter, Injectable } from '@angular/core';
import { Request } from '../../../../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestToCollectService {


  public requestToCollect!:Request
  constructor() { }

  setRequest(request:Request) {
    this.requestToCollect = request
  }
  getRequest():Request {
    return this.requestToCollect
  }

}

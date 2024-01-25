import { EventEmitter, Injectable } from '@angular/core';
import { Request } from '../../../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestToCollectService {

  public completed = new EventEmitter<boolean>()
  public requestToCollect!:Request
  constructor() { }

  setRequest(request:Request) {
    this.requestToCollect = request
  }
  getRequest():Request {
    return this.requestToCollect
  }

  completedRequest() {
    this.completed.emit(true)
  }
  incompletedRequest() {
    this.completed.emit(false)
  }
}

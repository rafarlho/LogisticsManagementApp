import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoodsTransferService {

  public quantityAndId = new EventEmitter<{id:string,quantity:number}>()

  constructor() { }

  sendQuantity(id:string,quantity:number) {
    this.quantityAndId.emit({id:id,quantity:quantity})
  }
}

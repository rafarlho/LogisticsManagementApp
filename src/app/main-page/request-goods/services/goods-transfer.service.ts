import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoodsTransferService {
  
  public quantityAndId = new EventEmitter<{id:string,quantity:number}>()
  public filterTransfered = new EventEmitter<Event>()
  public quantityAndIdList:{id:string,quantity:number}[] = []
  constructor() { }

  sendQuantity(id:string,quantity:number) {
    this.quantityAndId.emit({id:id,quantity:quantity})
  }

  setFilter(e:Event) {
    this.filterTransfered.emit(e)
  }

  setGoodList(array:{id:string,quantity:number}[]) {
    this.quantityAndIdList = array
  }

  getGoodList():{id:string,quantity:number}[] {
    return this.quantityAndIdList
  }

  eraseGoodList(){
    this.quantityAndIdList = []
  }
}

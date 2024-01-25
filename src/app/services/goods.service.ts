import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Good } from '../models/good.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  private readonly url = "http://127.0.0.1:3000/goods"
  private goodsSubject$:BehaviorSubject<Good[]> = new BehaviorSubject<Good[]>([])
  private loaded:boolean = false 

  constructor(
    private http:HttpClient
  ) {}

  get():Observable<Good[]> {

    return this.http.get<Good[]>(this.url)
      .pipe(
        catchError((e)=>{
          return throwError(()=> new Error('Error getting requests: ',e))
        })
      )
    }
   
}


import { Injectable } from '@angular/core';
import { Request } from '../models/request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private readonly url = "http://127.0.0.1:3000/requests"
  private requestsSubject$:BehaviorSubject<Request[]> = new BehaviorSubject<Request[]>([])
  private loaded:boolean = false 

  constructor(
    private http:HttpClient
  ) {}

  get():Observable<Request[]> {
    this.http.get<Request[]>(this.url)
        .subscribe(this.requestsSubject$)
    return this.requestsSubject$.asObservable()
  }
}

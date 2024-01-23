import { Injectable } from '@angular/core';
import { Request } from '../models/request.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
    if(!this.loaded) {
      this.http.get<Request[]>(this.url)
      .subscribe(this.requestsSubject$)
      this.loaded=true
    }
    return this.requestsSubject$.asObservable()
  }

  add(req:Request):Observable<Request> {
    return this.http.post<Request>(this.url,req)
  }

  editToOnCollection(req:Request):Observable<Request> {
    return this.http.patch<Request>(`${this.url}/oncollection`,req)
  }
  editStatus(req:Request):Observable<Request> {
    return this.http.patch<Request>(`${this.url}/updatestatus`,req)
  }
}

import { Injectable } from '@angular/core';
import { Request } from '../models/request.model';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
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
    return this.http.get<Request[]>(this.url)
      .pipe(
        catchError((e)=>{
          return throwError(()=> new Error('Error getting requests: ',e))
        })
      )
    
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

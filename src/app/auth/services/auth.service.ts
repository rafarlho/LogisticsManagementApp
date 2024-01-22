import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private subjectUser$:BehaviorSubject<User>  = new BehaviorSubject<User>({} as User);
  private subjectLoggedIn$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)  
  private readonly url ="http://127.0.0.1:3000/auth"
  constructor(
    private httpClient:HttpClient
  ) { }

  login(id:string,password:string):Observable<User> {
    return this.httpClient.post<User>(`${this.url}/login`,{id,password})
      .pipe(
        tap((u)=>{
          if(u.token!= undefined) {
            localStorage.setItem('token',u.token)
            this.subjectLoggedIn$.next(true)
            this.subjectUser$.next(u)
          }
        })
      )
  }

  isAuthenticated():Observable<boolean> {
    const token = localStorage.getItem('token')
    //condição para quando se da refresh À pagina
    if(token && !this.subjectLoggedIn$.value) { 
      return this.checkTokenValidation()
    }
    return this.subjectLoggedIn$.asObservable()
  }

  checkTokenValidation():Observable<boolean> {
    return this.httpClient
      .get<User>(`${this.url}`)
      .pipe(
        tap((u:User) => {
          if(u && u.token!= undefined) {
            localStorage.setItem('token',u.token)
            this.subjectLoggedIn$.next(true)
            this.subjectUser$.next(u)
          }
        }),
        map((u:User)=>(u)? true : false),
        catchError((err)=> {
          this.logOut()
          return of(false)
        })
      )
  }


  getUser():Observable<User> {
    return this.subjectUser$.asObservable()
  }

  logOut() {
    localStorage.removeItem('token')
    this.subjectLoggedIn$.next(false)
    this.subjectUser$.next({} as User)
  }
  
}

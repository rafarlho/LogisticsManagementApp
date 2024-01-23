import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router:Router,
    private authService:AuthService
  ) { }

  canActivate(
  ):Observable<boolean>{
    return this.authService.isAuthenticated()
      .pipe(
        tap(b=> {
          if(!b) {
            this.router.navigateByUrl('/auth')
          }
        })
      )
  }
}

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(
        private authService:AuthService,
        private router:Router,
    ) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req)
        if(localStorage.getItem('token')) {
            let token = localStorage.getItem('token')
            if(token!=null) {

                const authReq = req.clone({
                    setHeaders: {
                        Authorization: token
                    }
                })
                return next.handle(authReq)
                    .pipe(
                        catchError((err)=> {
                            console.log(err)
                            if(err instanceof HttpErrorResponse) {
                                if(err.status === 401) {
                                    this.authService.logOut()
                                    this.router.navigateByUrl('/auth')
                                }
                            }
                            return throwError(() => err)
                        })
                    )
            }
        }
        return next.handle(req)
    }

}
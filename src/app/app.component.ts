import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { User } from './models/user.model';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterModule]
})
export class AppComponent {
  title = 'logistics_management_app';

  authenticated$!:Observable<boolean>  
  user$!:Observable<User>

  constructor(
    private authService:AuthService,
    private router:Router,
    ) {
    this.authenticated$ = this.authService.isAuthenticated()
    this.user$ = this.authService.getUser()
    }

   
}

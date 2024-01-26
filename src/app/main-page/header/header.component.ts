import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Observable, Subscription, map,timer } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../auth/services/auth.service';
import { User, UserType } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  //Button variables
  colorHelp:string = "dark"
  colorProfile:string = "dark"
  
  //User observable to get logged in user
  user$!:Observable<User>

  constructor(
    private authService:AuthService,
    private router:Router
  ) {
    this.user$ = this.authService.getUser()

  }

  //Variables to get real time
  time:Date =new Date()
  intervalID!:number
  subscription!:Subscription

  ngOnInit(): void {

    //Subscription to get real time and update it
    this.subscription = timer(0,1000)
      .pipe(
        map(() => new Date()),
      )
      .subscribe(Time => {
        this.time = Time
    })


  }

  //Method that converts UserType to string
  userTypeToString(type:UserType | undefined):string {
    switch(type){
      case 0: return "Factory Worker"
      case 1: return "Warehouse Operator"
      case 2: return "Production Line Manager"
      default: return "Factory Worker"
    }
  }

  //Funtion to logout a user
  logout() {
    this.authService.logOut()
    this.router.navigateByUrl('/auth')
  }

  //On destroy to avoid memory leaks
  ngOnDestroy(): void {
    clearInterval(this.intervalID) 
     if(this.subscription) this.subscription.unsubscribe()
  }
}

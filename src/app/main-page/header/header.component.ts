import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Subscription, map, share, timer } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  colorHelp:string = "dark"
  colorProfile:string = "dark"
  
  constructor(
  ) {
    //let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
    //console.log(currentDateTime)
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
  


  ngOnDestroy(): void {
    clearInterval(this.intervalID) 
     if(this.subscription) this.subscription.unsubscribe()
  }
}

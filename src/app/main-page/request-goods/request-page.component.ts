import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-request-page',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './request-page.component.html',
  styleUrl: './request-page.component.scss'
})
export class RequestPageComponent {
  
}

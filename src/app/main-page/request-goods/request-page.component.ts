import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';


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
  unsubscribe$:Subject<void> = new Subject<void>()

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}

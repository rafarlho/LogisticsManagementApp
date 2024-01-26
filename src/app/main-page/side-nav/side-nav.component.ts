import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    MatCardModule, 
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatDividerModule,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  user$!:Observable<User>

  constructor(
    private authService:AuthService,
    private router:Router
  ) {
    this.user$ = this.authService.getUser()
  }

 
}

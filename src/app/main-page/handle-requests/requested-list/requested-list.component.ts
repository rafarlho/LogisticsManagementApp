import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ListOfRequestedComponent } from './list-of-requested/list-of-requested.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-requested-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ListOfRequestedComponent,
    MatSidenavModule,
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './requested-list.component.html',
  styleUrl: './requested-list.component.scss'
})
export class RequestedListComponent {
}
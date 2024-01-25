import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isPassword:string = "password" 
  color="dark"
  wrong:boolean = false
  loginForm = this.formBuilder.group({
    'id':['',Validators.required],
    'password':['',[Validators.required,Validators.minLength(4)]],
  })
  unsubscribe$: Subject<any> = new Subject<any>()
  login$!: Observable<User>;
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router,
  ) {

  }

  //Login form on submit
  onSubmit() {
    const credentials = this.loginForm.value
    if(credentials.id && credentials.password) {
      this.login$ = this.authService.login(credentials.id,credentials.password) 
      this.login$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (user) => {
          this.wrong=false
          this.router.navigate(['']);

        },
        error: error =>{ 
          this.wrong = true
          this.clearFields()
        }
      })
    }
  }

  clearFields() {
    this.loginForm.reset()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(false)
    this.unsubscribe$.complete()
  }
}

import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
  loading:boolean=false
  loginForm = this.formBuilder.group({
    'id':['',Validators.required],
    'password':['',[Validators.required,Validators.minLength(4)]],
  })

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router
  ) {

  }

  //Login form on submit
  onSubmit() {
    const credentials = this.loginForm.value
    if(credentials.id && credentials.password) {
      this.loading = true
      this.authService.login(credentials.id,credentials.password)
      .subscribe({
        next: (user) => {
          this.loading=false
          this.router.navigate(['']);
        },
        error: error => console.error("Something went wrong during login. ",error)
      })
    }
  }
}

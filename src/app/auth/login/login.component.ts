import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

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
  loginForm = this.formBuilder.group({
    id:['',Validators.required],
    password:['',[Validators.required,Validators.minLength(4)]],
  })

  constructor(
    private formBuilder:FormBuilder
  ) {

  }

  //Login form on submit
  onSubmit() {
    throw new Error('Method not implemented.');
    }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService:AuthService,private route:Router) { }

  signinForm=new FormGroup({
    password:new FormControl('',[Validators.required,Validators.minLength(5)]),
    email:new FormControl('',[Validators.required,Validators.email])
  })
  
  ngOnInit(): void {
  }

  get password(){
    return this.signinForm.get('password')
  }
  get email(){
    return this.signinForm.get('email')
  }

  signIn(){
    this.authService.signIn(this.signinForm.value)
  }

  signUp(){
    this.route.navigate(['register'])
  }
}

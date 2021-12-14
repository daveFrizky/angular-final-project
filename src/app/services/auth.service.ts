import { HttpClient, HttpClientModule, HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint:string='https://app-payment-final.herokuapp.com/api/AuthManagement'
  header=new HttpHeaders().set('Content-Type','application/json')
  email:string=""
  constructor(private http:HttpClient,private router:Router) { }

  signUp(user:User){
      let api=`${this.endpoint}/Register`
      return this.http
              .post(api,user)
              .pipe(catchError(this.handleError))
  }

  handleError(e:HttpErrorResponse){
    let msg=''
    if (e.error instanceof ErrorEvent) {
      msg=e.error.message
    }else{
      msg=`Error Code: ${e.status}\nMessage: ${e.message}`
    }
    return throwError(msg)
  }

  signIn(user:User){
    let api=`${this.endpoint}/Login`
    return this.http
      .post(api,user)
      .subscribe((res:any)=>{
        localStorage.setItem('access_token',res.token)
        localStorage.setItem('user_name',res.username)
        this.router.navigate(['paymentDetail'])
      })
  }

  getToken(){
    return localStorage.getItem('access_token')
  }

  get isLoggedIn(): boolean{
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  getUser(){
    if (this.isLoggedIn) {
      return localStorage.getItem('user_name')
    }else{
      return 'Account'
    }   
  }

  logout(){
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_name')
    this.router.navigate(['login'])
  }
}

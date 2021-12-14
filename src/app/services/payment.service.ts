import { HttpClient, HttpErrorResponse ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  act:"update"|"off"="off"
  endpoint:string='https://app-payment-final.herokuapp.com/api'
  header=new HttpHeaders().set('Content-Type','application/json')
  currentUser:{name:string,email:string,id:string}={name:'',email:'',id:''}
  
  constructor(private http:HttpClient) { }

  handleError(e:HttpErrorResponse){
    let msg=''
    if (e.error instanceof ErrorEvent) {
      msg=e.error.message
    }else{
      msg=`Error Code: ${e.status}\nMessage: ${e.message}`
    }
    return throwError(msg)
  }

  getPayment():Observable<any>{
    let api=`${this.endpoint}/Payment`;
    return this.http.get(api)
    .pipe(
      map((res:any)=>{
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  addPayment(data:object){
    let api=`${this.endpoint}/Payment`
    return this.http
            .post(api,data)
            .pipe(catchError(this.handleError))
  }

  editPayment(data:object,id?:number): Observable<any> {
    let api=`${this.endpoint}/Payment/${id}`
    return (
      this.http
        .put(api, data)
        .pipe(catchError(this.handleError))
    )
  }

  getPaymentById(id:number){
    let api=`${this.endpoint}/Payment/${id}`;
    return this.http.get(api)
    .pipe(
      map((res:any)=>{
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  deletePayment(id?:Number){
    let api=`${this.endpoint}/Payment/${id}`
    return (
      this.http
        .delete(api)
        .pipe(catchError(this.handleError))
    )
  }
}

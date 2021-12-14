import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentDetail } from 'src/app/interfaces/payment-detail';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showForm:boolean=false
  payments:PaymentDetail[]=[]
  dataPayment:PaymentDetail={paymentDetailId:0,cardOwnerName: "",cardNumber: "",expirationDate: "",securityCode: ""}
  constructor(private service:PaymentService,private auth:AuthService,public router:Router) { }

  ngOnInit(): void {
    this.FillData()
  }

  FillData(){
    this.service.getPayment()
    .subscribe((res:any)=>{
      this.payments=res
    })
  }

  Edit(id?:number){
    this.payments.filter(i=>i.paymentDetailId==id).forEach(i=>{
      this.dataPayment.paymentDetailId=i.paymentDetailId;
      this.dataPayment.securityCode=i.securityCode;
      this.dataPayment.expirationDate=i.expirationDate;
      this.dataPayment.cardOwnerName=i.cardOwnerName;
      this.dataPayment.cardNumber=i.cardNumber;
    })
    this.service.act="update"
    this.ShowAdd()
    
  }

  Clear(){
    this.dataPayment={paymentDetailId:0,cardOwnerName: "",cardNumber: "",expirationDate: "",securityCode: ""}
  }

  ShowAdd(){
    if (this.showForm ) {
      this.showForm=false
      this.Clear()
    }else{ 
      this.showForm=true
    }  
  }

  Remove(id?:number){
    this.payments.filter(i=>i.paymentDetailId==id).forEach(i=>{
      this.dataPayment.cardOwnerName=i.cardOwnerName;
    })
    var r = confirm(`Are you sure you want to delete "${this.dataPayment.cardOwnerName}" ?`);
    if (r == true){
      this.service.deletePayment(id)
      .subscribe((res:any)=>{
        location.reload();
      })
    }
  }

}

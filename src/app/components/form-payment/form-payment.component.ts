import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentDetail } from 'src/app/interfaces/payment-detail';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-form-payment',
  templateUrl: './form-payment.component.html',
  styleUrls: ['./form-payment.component.css']
})
export class FormPaymentComponent implements OnInit {
  @Input() dataPayment:PaymentDetail={paymentDetailId:0,cardOwnerName: "",cardNumber: "",expirationDate: "",securityCode: ""}
  constructor(private service:PaymentService) { }
  PForm=new FormGroup({
    cardOwnerName:new FormControl('',[Validators.required,Validators.minLength(5)]),
    cardNumber:new FormControl('',[Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(16)]),
    securityCode:new FormControl('',[Validators.required,Validators.minLength(6)]),
    expirationDate:new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(5),Validators.pattern('(([0-1])([0-9])/([0-9])([0-9]))')])
  })

  get cardOwnerName(){
    return this.PForm.get('cardOwnerName')
  }
  get cardNumber(){
    return this.PForm.get('cardNumber')
  }
  get securityCode(){
    return this.PForm.get('securityCode')
  }
  get expirationDate(){
    return this.PForm.get('expirationDate')
  }

  ngOnInit(): void {
    this.FillForm()
  }

  AddPayment(){
    this.service.addPayment(this.PForm.value)
    .subscribe((res:any)=>{
      location.reload();      
    })
  }

  UpdateForm(){
    let id=this.dataPayment.paymentDetailId
      this.dataPayment=this.PForm.value
      this.dataPayment.paymentDetailId=id
      this.service.editPayment(this.dataPayment,id)
      .subscribe((res:any)=>{
        location.reload();
      })
  }

  submitHandler(){
    if (this.service.act!="update"){
      this.AddPayment()
    }else{ 
      this.UpdateForm()
      this.service.act="off"
    }console.log(this.dataPayment.paymentDetailId)
  }

  FillForm(){
    if (this.service.act=="update") {
      this.cardNumber?.setValue(this.dataPayment.cardNumber)
      this.cardOwnerName?.setValue(this.dataPayment.cardOwnerName)
      this.expirationDate?.setValue(this.dataPayment.expirationDate)
      this.securityCode?.setValue(this.dataPayment.securityCode)
    }
  }
}

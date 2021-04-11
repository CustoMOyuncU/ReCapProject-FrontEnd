import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validator, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditService } from 'src/app/services/credit.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  creditAddForm:FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private creditService:CreditService,
    private toastrService:ToastrService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.createCardAddForm()
  }

  createCardAddForm(){
    this.creditAddForm = this.formBuilder.group({
      cardNumber:["",Validators.maxLength(16)],
      cvv:["",Validators.maxLength(3)],
      expiryDate:["",Validators.required]
    })
  }

  pay(){
    console.log(this.creditAddForm.value)
    
    if(this.creditAddForm.valid){
      let cardModule = Object.assign({},this.creditAddForm.value)
      this.toastrService.success("Ödeme Başarılı","Başarı")
      this.route.navigate([""])
    }
  }

}

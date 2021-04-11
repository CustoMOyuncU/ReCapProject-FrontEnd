import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validator, Validators} from "@angular/forms"

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  creditAddForm:FormGroup

  constructor(
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.createCardAddForm()
  }

  createCardAddForm(){
    this.creditAddForm = this.formBuilder.group({
      cardNumber:["",Validators.required],
      cvv:["",Validators.required],
      expiryDate:["",Validators.required]
    })
  }

  pay(){
    console.log(this.creditAddForm.value)
    let cardModule = Object.assign({},this.creditAddForm.value)
  }

}

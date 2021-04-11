import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validator} from "@angular/forms"

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  creditAddForm:FormGroup

  constructor() { }

  ngOnInit(): void {
  }

  creditCardControl(){
    
  }

}

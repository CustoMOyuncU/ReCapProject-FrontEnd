import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validator, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditService } from 'src/app/services/credit.service';
import { RentalService } from 'src/app/services/rental.service';

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
    private rentService:RentalService,
    private toastrService:ToastrService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.createCardAddForm()
  }

  createCardAddForm(){
    this.creditAddForm = this.formBuilder.group({
      cardNumber:["",Validators.max(16)],
      cvv:["",Validators.max(3)],
      expiryDate:["",Validators.required]
    })
  }

  pay(){
    console.log(this.creditAddForm.value)
    
    if(this.creditAddForm.valid){
      let cardModule = Object.assign({},this.creditAddForm.value)
      let rentModule = Object.assign({},this.rentService.rent)
      console.log(rentModule)
      this.rentService.addRental(rentModule).subscribe(response=>{
        this.toastrService.info(response.message,"Sistem")
        this.toastrService.success("Ödeme Başarılı","Başarı")
        this.route.navigate([""])
      })
      
    }else{
      this.toastrService.error("Bilgilerinizi doğru girdiğinizden emin olun","Hata")
    }
  }

}

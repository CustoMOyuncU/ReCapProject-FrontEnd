import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarAddService } from 'src/app/services/car-add.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  carAddForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private carAddService:CarAddService,
    private toastService:ToastrService
    ) { }

  ngOnInit(): void {
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }

  add(){
    if(this.carAddForm.valid){
      let carModule = Object.assign({},this.carAddForm.value)
      this.carAddService.add(carModule).subscribe(response=>{
        this.toastService.success("Ürün Eklendi","Ekleme")
      })
      
    }else{
      this.toastService.error("Formunuz Eksik","Hata")
    }
    
  }
}

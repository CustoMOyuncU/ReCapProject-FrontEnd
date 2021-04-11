import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import {FormGroup,FormBuilder,FormControl,Validator, Validators} from "@angular/forms"
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  
  cars: Car[];
  carImage: CarImage;
  carImageUrl: string;
  rentAddForm:FormGroup
  strUserId:string
  userId:number
  carID:number

  constructor(
    private toastrService:ToastrService,
    private carImageService: CarImageService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private carService:CarService,
    private authService:AuthService,
    private rentalService:RentalService,
    private router:Router
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarById(params["carId"]);
        this.getCarImage(params["carId"])
        this.createRentalAddFrom(params["carId"])
        
        console.log(this.cars)
      }
    })
  }

  getCarImage(carId:number) {
    this.carImageService
      .getImagesByCarId(carId)
      .subscribe((response) => {
        this.carImage = response.data[0];
        this.carImageUrl = this.carImageService.getCarImageUrl(
          this.carImage.id
        );
      });
      this.strUserId = this.authService.getUserIdByJwt()
      this.userId=+this.strUserId
      console.log(typeof this.userId)
  }

  getCarById(carId:number){
    this.carService.getCarById(carId).subscribe(response=>{
      this.cars=response.data
      console.log(response)
    })
  }

  createRentalAddFrom(strcarId:string){
    this.carID=+strcarId
    this.rentAddForm = this.formBuilder.group({
      carId:[this.carID,Validators.required],
      userId:[this.userId,Validators.required],
      rentDate:["",Validators.required],
      returnDate:["",Validators.required]
    })
  }

  rentalAdd(){
    if(this.authService.isAuthenticated()){
      if(this.rentAddForm.valid){
        let rentModule = Object.assign({},this.rentAddForm.value)
        console.log(this.rentAddForm.value)
        this.rentalService.isRentable(rentModule).subscribe(response=>{
          this.toastrService.info("Ödeme bilgilerinizi giriniz","Sistem")
          this.router.navigate(["cars/"+this.carID+"/payment"])
        },responseError=>{
          this.toastrService.error(responseError.error.message,"Hata")
        })
      }
    }else{
      this.toastrService.info("Araba Kiralamak İçin Giriş Yapın","Giriş Yapılmadı")
      this.router.navigate(["login"])
    }
  }


}

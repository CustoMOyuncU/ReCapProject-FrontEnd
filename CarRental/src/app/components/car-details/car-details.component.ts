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
  userId:number
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
      this.userId = this.authService.getUserIdByJwt()
      console.log(this.userId)
  }

  getCarById(carId:number){
    this.carService.getCarById(carId).subscribe(response=>{
      this.cars=response.data
      console.log(response)
    })
  }

  createRentalAddFrom(carID:number){
    
    this.rentAddForm = this.formBuilder.group({
      carId:[carID,Validators.required],
      userId:[this.userId,Validators.required],
      rentDate:["",Validators.required],
      returnDate:["",Validators.required]
    })
  }

  rentalAdd(){
    if(this.authService.isAuthenticated()){
      let rentModule = Object.assign({},this.rentAddForm.value)
      this.rentalService.addRental(rentModule).subscribe(response=>{
        this.toastrService.success("Kiralama Başarılı","Kiralama")
      })
    }else{
      this.toastrService.info("Araba Kiralamak İçin Giriş Yapın","Giriş Yapılmadı")
      this.router.navigate(["login"])
    }
  }
}

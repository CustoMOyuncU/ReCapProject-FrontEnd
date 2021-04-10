import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-images',
  templateUrl: './car-images.component.html',
  styleUrls: ['./car-images.component.css']
})
export class CarImagesComponent implements OnInit {

  carImage!: CarImage;
  carImageUrl: string
  @Input() car!: Car;
  constructor(
    private carImageService:CarImageService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.getCarImage();
  }

  getCarImage() {
    this.carImageService
      .getImagesByCarId(this.car.carId)
      .subscribe((response) => {
        this.carImage = response.data[0];
        this.carImageUrl = this.carImageService.getCarImageUrl(this.carImage.id)
      });
  }

}

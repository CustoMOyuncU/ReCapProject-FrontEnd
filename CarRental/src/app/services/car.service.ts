import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44358/api/';
  constructor(private httpClient: HttpClient) {}

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl+"cars/getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByFilter(colorId:number,brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getbyfilter?colorId="+colorId+"&brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getbycolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getbybrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/get?id="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  

}

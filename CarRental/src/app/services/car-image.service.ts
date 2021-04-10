import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiControllerUrl=environment.baseUrl+"/carimages"
  apiUrl="https://localhost:44358/"

  constructor(private httpClient:HttpClient) { }

  getImagesByCarId(id: number): Observable<ListResponseModel<CarImage>> {
    return this.httpClient.get<ListResponseModel<CarImage>>(
      `${this.apiControllerUrl}/getcarimagebycarid?id=${id}`
    );
  }
  getCarImageUrl(id: number): string {
    return `${this.apiControllerUrl}/getfilebyid?id=${id}`;
  }
}

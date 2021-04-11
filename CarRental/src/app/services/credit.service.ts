import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cards } from '../models/card';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  apiUrl=environment.baseUrl+"/cards/"
  constructor(private httpClient:HttpClient) { }

  getCardsByUserId(userId:number):Observable<ListResponseModel<Cards>>{
    return this.httpClient.get<ListResponseModel<Cards>>(this.apiUrl+"getcardsbyuserid?userId="+userId)
  }

  addCard(cardModel:Cards):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",cardModel)
  }

}

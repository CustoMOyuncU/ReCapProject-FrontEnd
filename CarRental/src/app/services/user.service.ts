import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44358/api/';
  constructor(private httpClient: HttpClient) {}

  getUserById(userId:number): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(this.apiUrl+"users/get?id="+userId);
  }

  getUsers(): Observable<ListResponseModel<User>> {
    return this.httpClient.get<ListResponseModel<User>>(this.apiUrl+"users/getall");
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.baseUrl+"/auth/"
  constructor(
    private httpClient:HttpClient,
    private jwtHelper:JwtHelperService
    ) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",registerModel)
  }

  getUserIdByJwt(){
    if(this.isAuthenticated()){
      return this.jwtHelper.decodeToken(localStorage.getItem("token"))["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    }
  }

  updateUser(user:User){
    return this.httpClient.post(this.apiUrl+"updateuser",user)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true
    }else{
      return false
    }
  }
}

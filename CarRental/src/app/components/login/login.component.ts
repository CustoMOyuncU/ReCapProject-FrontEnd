import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel =Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        localStorage.removeItem("token")
        this.toastrService.info("Giriş yapıldı","Giriş")
        localStorage.setItem("token",response.data.token)
        this.router.navigate([""])
      },responseError=>{
        this.toastrService.error("Email veya şifre hatalı","Hatalı Giriş")
      })

    }
  }

  

}

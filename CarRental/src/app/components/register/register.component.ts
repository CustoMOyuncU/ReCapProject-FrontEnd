import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validator, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm= this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  register(){
    let registerModel = Object.assign({},this.registerForm.value)
    this.authService.register(registerModel).subscribe(response=>{
      localStorage.removeItem("token")
      localStorage.setItem("token",response.data.token)
      this.toastrService.success("Kayıt başarılı","Kayıt")
      this.router.navigate([""])
    },responseError=>{
      this.toastrService.error("Formunuzu eksiksiz doldurunuz","Hata")
    })
  }

}

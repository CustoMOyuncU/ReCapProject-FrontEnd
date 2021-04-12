import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {FormGroup,FormBuilder,FormControl,Validator, Validators} from "@angular/forms"
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user:User
  userAddForm:FormGroup
  dataLoaded:boolean = false

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  
  }

  getUserInfo(){
    var userId= this.authService.getUserIdByJwt()
    this.userService.getUserById(userId).subscribe(response=>{
      this.user=response.data
      this.createUserAddForm();
    }) 
  }

  changeClass(){
    let element = document.getElementsByClassName('input-group-text') as HTMLCollectionOf<HTMLElement>
      element[0].className='form-control'
  }

  createUserAddForm(){
     this.userAddForm = this.formBuilder.group({ 
      userId:[this.user.id,Validators.required],
      firstName:[this.user.firstName,Validators.required],
      lastName:[this.user.lastName,Validators.required],
      email:[this.user.email,Validators.required],
      oldEmail:[this.user.email,Validators.required],
      password:[""]
    })
    this.dataLoaded=true
  }
  
  save(){
    console.log(this.userAddForm.value)
    if(this.userAddForm.valid){
      let userModule = Object.assign({},this.userAddForm.value)
      this.authService.updateUser(userModule).subscribe(response=>{
        this.toastrService.success("Bilgiler Güncellendi","Bilgi")
      },responseError=>{
        
      })
    }
    
  }

}

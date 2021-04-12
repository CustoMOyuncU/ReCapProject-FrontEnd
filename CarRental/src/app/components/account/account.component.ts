import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user:User

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private toastrService:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo(){
    var userId= this.authService.getUserIdByJwt()
    this.userService.getUserById(userId).subscribe(response=>{
      this.user=response.data
    }) 
  }

}

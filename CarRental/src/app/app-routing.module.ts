import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarImagesComponent } from './components/car-images/car-images.component';
import { CarComponent } from './components/car/car.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"users",component:UserComponent},
  {path:"rentals",component:RentalComponent},
  {path:"cars/search/color/:colorId",component:CarComponent},
  {path:"cars/search/brand/:brandId",component:CarComponent},
  {path:"cars/search/color/:colorId/brand/:brandId",component:CarComponent},
  {path:"carimage",component:CarImagesComponent},
  {path:"cars/:carId", component:CarDetailsComponent},
  {path:"cars/admin/add",component:CarAddComponent, canActivate:[LoginGuard]},

  {path:"cars/:carId/payment",component:PaymentComponent},

  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

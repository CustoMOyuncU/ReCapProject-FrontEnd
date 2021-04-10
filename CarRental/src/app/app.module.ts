import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"
import {FormsModule,ReactiveFormsModule} from "@angular/forms"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {JwtModule} from "@auth0/angular-jwt"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { UserComponent } from './components/user/user.component';
import { NaviComponent } from './components/navi/navi.component';
import { RentalComponent } from './components/rental/rental.component';
import { ColorComponent } from './components/color/color.component';
import { from } from 'rxjs';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';

import {ToastrModule} from "ngx-toastr";
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { CarImagesComponent } from './components/car-images/car-images.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


export function tokenGetter(){
  return localStorage.getItem("token")
}

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    UserComponent,
    NaviComponent,
    RentalComponent,
    ColorComponent,
    FilterPipePipe,
    CarFilterPipe,
    SideBarComponent,
    CarImagesComponent,
    CarDetailsComponent,
    CarAddComponent,
    LoginComponent,
    RegisterComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({positionClass:"toast-bottom-right"}),
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        allowedDomains:["localhost:4200","localhost:44358"]
      }
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

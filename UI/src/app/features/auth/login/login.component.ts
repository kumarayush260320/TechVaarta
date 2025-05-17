import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  model:LoginRequest;


  constructor(private authService:AuthService,
    private cookieService:CookieService,
    private router:Router
  ){
    this.model={
      email:'',
      password:''
    };
  }

  onFormSubmit(){
    //console.log(this.model);
this.authService.login(this.model)
.subscribe({
  next:(response)=>{
    //console.log(response);
    //Set auth Cookie
this.cookieService.set('Authorization',`Bearer ${response.token}`,
  undefined,'/',undefined,true,'Strict');

//set user
this.authService.setUser({
email:response.email,
roles:response.roles
});



//redirect back to home
this.router.navigateByUrl('/');


  }
});
  }
}

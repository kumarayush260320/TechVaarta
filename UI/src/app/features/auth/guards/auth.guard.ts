import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';


//this auth.gaurd actually stop people to directly access the routes 
//it will secure the routes from people who knows the actual routes of
//diffeerent pages
//will redirect to login page if any unauthenticated user tries to login
//Reader roles will also be not able to acccess admin page
export const authGuard: CanActivateFn = (route, state) => {

const authService=inject(AuthService)
  const cookieService=inject(CookieService)
  const router=inject(Router)
const user=authService.getUser();


 //check for JWT token
let token=cookieService.get('Authorization');


//not allowing unauthenticated people to reach admin functionality
if(token)
{
    token=token.replace('Bearer','');
    const decodedToken:any=jwtDecode(token);//jwtDecode is a package to decode the token

    //check if token has expired

    const expirationDate=decodedToken.exp * 1000;
    const currentTime=new Date().getTime();
    if(expirationDate<currentTime)
    {
    //Logout
    authService.logout();
    return router.createUrlTree(['/login'],{queryParams:{returnUrl:state.url}})
    }
    else
    {
    //Token is still valid
      if(user?.roles.includes('Writer'))
      {
        return true;
      }
      else
      {
        alert('Unauthorized');
        return false;
      }
    }
}
else
{
//Logout
authService.logout();
return router.createUrlTree(['/login'],{queryParams:{returnUrl:state.url}})

}
};

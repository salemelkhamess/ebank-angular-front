import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LoginService} from '../services/login.service';

export const authentificationGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router)
  if (authService.isAuthenticated){
    return  true
  }else{
    router.navigateByUrl("/login")
    return  false
  }
};

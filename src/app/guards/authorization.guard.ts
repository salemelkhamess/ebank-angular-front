import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {LoginService} from '../services/login.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const  loginService = inject(LoginService)
  const  router = inject(Router)
  if (loginService.roles.includes("ADMIN")){
    return  true
  }else {
    router.navigateByUrl("/admin/not-authorized")
    return  false
  }
};

import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.loggedIn()) {
    return true;
  }
  else{
    router.navigate(["login"]);
    alert("You must log in to view this page!")
    return false;
  }

};

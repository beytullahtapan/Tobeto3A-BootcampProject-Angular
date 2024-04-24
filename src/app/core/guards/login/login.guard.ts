import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { inject } from '@angular/core';
import { AppToastrService, ToastrMessageType } from '../../../features/services/concretes/app-toastr.service';

export const loginGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const toastrService = inject(AppToastrService);

  if(authService.loggedIn()) {
    return true;
  }
  else{
    router.navigate(["login"],{queryParams: { returnUrl: state.url }});
    toastrService.message("You must log in to view this page!", "Info", ToastrMessageType.Info);
    return false;
  }

};

import { CanActivateFn, Router} from '@angular/router';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { inject } from '@angular/core';
import { AppToastrService, ToastrMessageType } from '../../../features/services/concretes/app-toastr.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(AppToastrService);
  const expectedRoles = route.data['expectedRoles'];

  if(!authService.loggedIn() || !authService.hasRole(expectedRoles)){
    router.navigate(['/']);
    toastService.message("Access Denied: You do not have permission to access this page.","Error",ToastrMessageType.Error);
    return false;
  }
  return true;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

export const reactiveCrudCanActivateGuard: CanActivateFn = (route, state) => {
  const as = inject(AuthService);
  const router = inject(Router);
  if (!as.isAuthenticated) {
    router.navigateByUrl('/auth');
    return false;
  } else {
    return as.isAuthenticated$;
  }
};

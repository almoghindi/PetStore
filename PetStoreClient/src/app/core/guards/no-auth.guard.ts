import { CanActivateFn } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  if (!localStorage.getItem('authName')) {
    return true;
  } else {
    return false;
  }
};

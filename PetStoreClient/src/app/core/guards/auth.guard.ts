import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('authName')) {
    return true;
  } else {
    return false;
  }
};

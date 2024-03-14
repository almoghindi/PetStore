import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { CartState, CartItem } from '../../../core/store/cart.state';
import { AuthService } from '../../../core/services/auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUserAlt,
  faSearch,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartItems$: Observable<CartItem[]>;
  total$: Observable<number>;
  isLoggedIn: boolean = false;
  faUserAlt = faUserAlt;
  faSearch = faSearch;
  faCartShopping = faCartShopping;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<{ cart: CartState }>
  ) {
    this.cartItems$ = this.store.select((state) => state.cart.items);
    this.total$ = this.cartItems$.pipe(
      map((items) =>
        items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
      )
    );
  }
  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.isLoggedIn = !!localStorage.getItem('authName');
  }
  handleLogin() {
    this.router.navigate(['/login']);
  }
  handleLogout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  search(event: Event, query: string): void {
    event.preventDefault();
    if (query == '') {
      return;
    }
    this.router.navigate(['/catalog'], { queryParams: { search: query } });
  }
}

import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { ProductItemComponent } from './features/catalog/product-item/product-item.component';
import { AdminComponent } from './features/admin/admin.component';
import { AdminAddComponent } from './features/admin/admin-add/admin-add.component';
import { AdminEditComponent } from './features/admin/admin-edit/admin-edit.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { PayComponent } from './features/checkout/pay/pay.component';
import { OrdersListComponent } from './features/orders/orders-list/orders-list.component';
import { OrderDetailsComponent } from './features/orders/order-details/order-details.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [noAuthGuard] },
  { path: 'catalog', component: CatalogComponent },
  { path: 'catalog/:id', component: ProductItemComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: 'admin/add', component: AdminAddComponent, canActivate: [authGuard] },
  {
    path: 'admin/edit/:id',
    component: AdminEditComponent,
    canActivate: [authGuard],
  },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'pay', component: PayComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersListComponent, canActivate: [authGuard] },
  {
    path: 'orders/:id',
    component: OrderDetailsComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];

import { Routes } from '@angular/router';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { LoginUserComponent } from './pages/login-user/login-user.component';

export const routes: Routes = [
  {
    path: '',
    component: RegisterUserComponent,
  },
  {
    path: 'login',
    component: LoginUserComponent,
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
];

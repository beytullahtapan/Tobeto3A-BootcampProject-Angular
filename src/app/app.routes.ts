import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { loginGuard } from './core/guards/login/login.guard';
import { adminRoutes } from './admin/admin.routes';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
   { path: '', component: HomePageComponent }, 
   { path: 'profile', component: ProfileComponent,canActivate: [loginGuard] },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   //Admin
   { path: 'admin', children: adminRoutes },
];

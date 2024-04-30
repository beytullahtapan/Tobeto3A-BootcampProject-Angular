import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { loginGuard } from './core/guards/login/login.guard';
import { adminRoutes } from './admin/admin.routes';
import { AdminComponent } from './admin/admin.component';
import { formConfirmExitGuard } from './core/guards/form/form-confirm-exit.guard';
import { ContactComponent } from './pages/contact/contact-page.component';


export const routes: Routes = [
   { path: '', component: HomePageComponent }, 
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent, canDeactivate:[formConfirmExitGuard] },
   { path:'contact',component:ContactComponent},

   //Admin
   { path: 'admin', children: adminRoutes },
];

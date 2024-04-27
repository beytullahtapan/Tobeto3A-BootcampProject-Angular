import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { loginGuard } from './core/guards/login/login.guard';
import { adminRoutes } from './admin/admin.routes';
import { formConfirmExitGuard } from './core/guards/form/form-confirm-exit.guard';

export const routes: Routes = [
   
   {path:'',redirectTo:'',pathMatch:'full'},
   //{path:"",component:HomePageComponent,canActivate: [loginGuard],children:[]},
   {path:"",component:HomePageComponent,children:[]},
   {path:"login",component:LoginComponent},
   {path:"register",component:RegisterComponent, canDeactivate:[formConfirmExitGuard]},

   //Admin
   { path: 'admin', children: adminRoutes },
];
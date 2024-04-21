import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { loginGuard } from './core/guards/login/login.guard';

export const routes: Routes = [
   
   {path:'',redirectTo:'',pathMatch:'full'},
   //{path:"",component:HomePageComponent,canActivate: [loginGuard],children:[]},
   {path:"",component:HomePageComponent,children:[]},
   {path:"login",component:LoginComponent,children:[]},
   {path:"register",component:RegisterComponent,children:[]}
];
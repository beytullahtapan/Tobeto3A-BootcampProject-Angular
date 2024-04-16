import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = 
[
   
   {path:'',redirectTo:'',pathMatch:'full'},
   {path:"",component:HomePageComponent,children:[]},
   {path:'',redirectTo:'login',pathMatch:'full'},
   {path:"login",component:LoginComponent,children:[]},
   {path:'',redirectTo:'register',pathMatch:'full'},
   {path:"register",component:RegisterComponent,children:[]}
];
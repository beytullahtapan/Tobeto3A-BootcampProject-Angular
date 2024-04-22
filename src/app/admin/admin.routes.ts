import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserComponent } from './components/user/user.component';

export const adminRoutes: Routes = [
   { path: "", component: AdminComponent, children: [
       { path: "user", component: UserComponent }
   ]}
];

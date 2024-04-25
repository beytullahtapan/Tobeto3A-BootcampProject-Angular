import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserComponent } from './components/user/user.component';
import { roleGuard } from '../core/guards/role/role.guard';
import { AuthRoleType } from '../features/constants/auth-role-type';

export const adminRoutes: Routes = [
   { path: "", component: AdminComponent, canActivate:[roleGuard], data: {expectedRoles: [AuthRoleType.Admin]}, children: [
       { path: "user", component: UserComponent }
   ]}
];

//birden fazla role erişim izni verildiği durumlarda roleGuard kullanım şekli:
//canActivate:[roleGuard],data: {expectedRoles: [AuthRoleType.Admin || AuthRoleType.Employee]}
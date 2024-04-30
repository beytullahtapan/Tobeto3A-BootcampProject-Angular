import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserComponent } from './components/user/user.component';
import { BootcampsComponent } from './components/bootcamps/bootcamps.component';
import { AddComponent } from './components/bootcamps/add/add.component';
import { roleGuard } from '../core/guards/role/role.guard';
import { AuthRoleType } from '../features/constants/auth-role-type';

export const adminRoutes: Routes = [
    { path: "", component: AdminComponent, children: [
        { path: "user", component: UserComponent },
        { path: "bootcamps", component: BootcampsComponent },
        { path: "bootcamps/add", component: AddComponent },
    ]},
    
 ];
 

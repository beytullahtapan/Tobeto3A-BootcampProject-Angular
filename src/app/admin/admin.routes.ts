import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserComponent } from './features/components/user/user.component';
import { BootcampsComponent } from '../features/components/bootcamps/bootcamps.component';
import { AddComponent } from './features/components/bootcamps/add/add.component';
import { SettingsComponent } from './features/components/settings/settings.component';


export const adminRoutes: Routes = [
    { path: "", component: AdminComponent, children: [
        { path: "user", component: UserComponent },
        { path: "bootcamps/list", component: BootcampsComponent },
        { path: "bootcamps/add", component: AddComponent },
        { path: "settings", component: SettingsComponent },
    ]},
    
 ];
 

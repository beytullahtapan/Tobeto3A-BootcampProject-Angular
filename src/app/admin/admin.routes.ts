import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UserComponent } from './features/components/user/user.component';
import { SettingsComponent } from './features/components/settings/settings.component';


export const adminRoutes: Routes = [
    { path: "", component: AdminComponent, children: [
        { path: "user", component: UserComponent },
        { path: "settings", component: SettingsComponent },
    ]},
    
 ];
 

import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { adminRoutes } from './admin/admin.routes';
import { formConfirmExitGuard } from './core/guards/form/form-confirm-exit.guard';
import { ContactComponent } from './pages/contact/contact-page.component';
import { instructorRoutes } from './instructor/instructor.routes';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { BootcampListPageComponent } from './pages/bootcamp-list-page/bootcamp-list-page.component';
import { AnnouncementsComponent } from './pages/announcements/announcements.component';
import { InstructorPageComponent } from './pages/instructor-page/instructor-page.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings/profile-settings.component';
import { ViewbootcampComponent } from './pages/viewbootcamp/viewbootcamp.component';
import { InstructorApplicationPageComponent } from './pages/instructor-application-page/instructor-application-page.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { loginGuard } from './core/guards/login/login.guard';
import { roleGuard } from './core/guards/role/role.guard';
import { AuthRoleType } from './features/constants/auth-role-type';




export const routes: Routes = [
   { path: '', component: HomePageComponent }, 
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent, canDeactivate:[formConfirmExitGuard] },
   { path:'contact',component:ContactComponent},
   { path:'chat',component: ChatPageComponent, canActivate:[loginGuard]},
   { path:'bootcamps',component:BootcampListPageComponent},
   { path:'inst-profile/:instructorId',component: InstructorPageComponent ,canActivate:[loginGuard]},
   { path:'announcements', component:AnnouncementsComponent ,canActivate:[loginGuard]},
   {path:'privacy-policy',component:PrivacyPolicyComponent},
   {path:'profile',component:ProfileComponent ,canActivate:[loginGuard]},
   {path:'account-setting',component:AccountSettingsComponent ,canActivate:[loginGuard]},
   {path:'profile-settings',component:ProfileSettingsComponent ,canActivate:[loginGuard]},
   {path:'viewbootcamp/:id',component:ViewbootcampComponent},
   { path: 'inst-application', component: InstructorApplicationPageComponent, canDeactivate:[formConfirmExitGuard] },
   {path:'maintenance',component:MaintenanceComponent},

   //Admin
   { path: 'admin', canActivate:[roleGuard], data: {expectedRoles: [AuthRoleType.Admin]}, children: adminRoutes},

   //Instructor
   { 
      path: 'instructor', 
      canActivate: [roleGuard], 
      data: { 
        expectedRoles: [AuthRoleType.Admin]
      }, 
      children: instructorRoutes 
    }

   

   
];

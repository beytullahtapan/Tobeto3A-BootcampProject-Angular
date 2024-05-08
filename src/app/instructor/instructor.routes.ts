import { Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { InstructorHomepageComponent } from './features/components/homepage/homepage.component';



export const instructorRoutes: Routes = [
    { path: "", component: InstructorComponent, children: [
        { path: "", component: InstructorHomepageComponent },
    ]},
    
 ];
 

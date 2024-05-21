import { Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { InstructorHomepageComponent } from './features/components/homepage/homepage.component';
import { AddInstructorBootcampComponent } from './features/components/bootcamp/add/add.component';
import { ListInstructorBootcampComponent } from './features/components/bootcamp/list/list.component';
import { EditInstructorBootcampComponent } from './features/components/bootcamp/edit/edit.component';

export const instructorRoutes: Routes = [
    { path: "", component: InstructorComponent, children: [
        { path: "", component: InstructorHomepageComponent },
        { path: "bootcamp/add", component: AddInstructorBootcampComponent },
        { path: "bootcamp/list", component: ListInstructorBootcampComponent },
        { path: "bootcamp/edit/:id", component: EditInstructorBootcampComponent },

    ]},
 ];
 
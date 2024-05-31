import { Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';
import { InstructorHomepageComponent } from './features/components/homepage/homepage.component';
import { AddInstructorBootcampComponent } from './features/components/bootcamp/add/add.component';
import { ListInstructorBootcampComponent } from './features/components/bootcamp/list/list.component';
import { EditInstructorBootcampComponent } from './features/components/bootcamp/edit/edit.component';
import { AddInstructorLessonComponent } from './features/components/lesson/add/add.component';
import { ListInstructorLessonComponent } from './features/components/lesson/list/list.component';
import { EditInstructorLessonComponent } from './features/components/lesson/edit/edit.component';
import { InstructorContentComponent } from './features/components/lesson/content/content.component';

export const instructorRoutes: Routes = [
    { path: "", component: InstructorComponent, children: [
        { path: "", component: InstructorHomepageComponent },
        { path: "bootcamp/add", component: AddInstructorBootcampComponent },
        { path: "bootcamp/list", component: ListInstructorBootcampComponent },
        { path: "bootcamp/edit/:id", component: EditInstructorBootcampComponent },
        { path: "lesson/add/:id", component: AddInstructorLessonComponent },
        { path: "lesson/list/:id", component: ListInstructorLessonComponent },
        { path: "lesson/edit/:id", component: EditInstructorLessonComponent },
        { path: "lesson/content/:id", component: InstructorContentComponent },
    ]},
 ];
 
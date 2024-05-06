import { NgModule, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditorModule } from "@tinymce/tinymce-angular";
import { InstructorNavbarComponent } from "./components/navbar/navbar.component";
import { InstructorSidebarComponent } from "./components/sidebar/sidebar.component";

@NgModule({
    declarations:[],
    exports:[CommonModule,InstructorNavbarComponent,InstructorSidebarComponent],
    imports:[CommonModule,CommonModule,InstructorNavbarComponent,InstructorSidebarComponent],

})
export class InstructorSharedModule{
    
}
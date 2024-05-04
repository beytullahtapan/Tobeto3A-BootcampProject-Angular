import { NgModule, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminSidebarComponent } from "./components/sidebar/sidebar.component";
import { AdminNavbarComponent } from "./components/navbar/navbar.component";
import { EditorModule } from "@tinymce/tinymce-angular";

@NgModule({
    declarations:[],
    exports:[CommonModule,AdminNavbarComponent,AdminSidebarComponent],
    imports:[CommonModule,CommonModule,AdminNavbarComponent,AdminSidebarComponent],

})
export class AdminSharedModule{
    
}
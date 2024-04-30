import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { AdminSidebarComponent } from "./components/sidebar/sidebar.component";
import { AdminNavbarComponent } from "./components/navbar/navbar.component";

@NgModule({
    declarations:[],
    exports:[CommonModule,AdminNavbarComponent,AdminSidebarComponent],
    imports:[CommonModule,CommonModule,AdminNavbarComponent,AdminSidebarComponent],

})
export class SharedModule{}
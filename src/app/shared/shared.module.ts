import { NgModule } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";



@NgModule({
    declarations:[],
    exports:[NavbarComponent],
    imports:[NavbarComponent,CommonModule]

})
export class SharedModule{}
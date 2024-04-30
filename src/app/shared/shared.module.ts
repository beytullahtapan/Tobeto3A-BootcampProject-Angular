import { NgModule } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
    declarations:[],
    exports:[NavbarComponent,FooterComponent,CommonModule],
    imports:[CommonModule,NavbarComponent,FooterComponent,CommonModule],

})
export class SharedModule{}
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppToastrService, ToastrMessageType } from '../../../features/services/concretes/app-toastr.service';
import { initFlowbite } from 'flowbite';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,HttpClientModule, CommonModule,FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  userLogged!:boolean;
  isAdmin!:boolean;
  constructor(private authService:AuthService,private router:Router, private toastrService:AppToastrService){}
   ngOnInit(): void {
    this.setUserLogged();
    this.setAdmin();
    initFlowbite();
   }

   logOut(){
    this.authService.logOut();
    this.toastrService.message("Logged out successfully.", "Success", ToastrMessageType.Success)
    //this.router.navigate(['/'])
   }

   setUserLogged() :boolean{
    return this.userLogged=this.authService.loggedIn()
   }

   setAdmin() : boolean{
    return this.isAdmin = this.authService.isAdmin()
   }
   getUserName():string{
    return this.authService.getUserName();
   }

   getUserId():string{
    return this.authService.getCurrentUserId();
   }

}

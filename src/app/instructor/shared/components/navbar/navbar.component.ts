import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../../features/services/concretes/auth.service';
import { AppToastrService, ToastrMessageType } from '../../../../features/services/concretes/app-toastr.service';

@Component({
  selector: 'instructorapp-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class InstructorNavbarComponent implements OnInit{
  constructor(private authService:AuthService,private router:Router, private toastrService:AppToastrService){}
  ngOnInit(): void {
    initFlowbite();
  }
  logOut(){
    this.authService.logOut();
    this.toastrService.message("Logged out successfully.", "Success", ToastrMessageType.Success)
    this.router.navigate(['/'])
   }
}

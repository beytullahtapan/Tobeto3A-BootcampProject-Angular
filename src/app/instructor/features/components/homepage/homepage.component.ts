import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { InstructorBootcamp } from '../../services/concretes/bootcamp.service';
import { AuthService } from '../../../../features/services/concretes/auth.service';
import { GetBootcampCountResponse } from '../../models/responses/homepage/getbootcampcountresponse';
import { HomepageService } from '../../services/concretes/homepage.service';
import { GetBootcampCountRequest } from '../../models/requests/homepage/getbootcampcountrequest';

@Component({
  selector: 'instructorapp-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class InstructorHomepageComponent implements OnInit{
  BootcampCount!: number;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private homepageService: HomepageService, private authService: AuthService) {}

  ngOnInit(): void {
    initFlowbite();
    this.GetBootcampCount();
  }

  GetBootcampCount(): void {
    const instructorId = this.authService.getCurrentUserId();
    const request: GetBootcampCountRequest = { InstructorId: instructorId };
    this.homepageService.getbootcampcount(request).subscribe((response: GetBootcampCountResponse) => {
      if (response && response.count !== undefined) {
        this.BootcampCount = response.count;
      }
    });
  } 
  
}

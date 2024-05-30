import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApplicantService } from '../../features/services/concretes/applicant.service';
import { GetbyidApplicantResponse } from '../../features/models/responses/applicant/getbyid-applicant-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  constructor(private activatedRoute: ActivatedRoute, private applicantService:ApplicantService) {}
  getApplicantByIdResponse!:GetbyidApplicantResponse
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: string; }) => {
      if (params["userId"]) {
        this.getApplicantById(params["userId"])
      } else { console.log("getById applicant error") }
    })
  }
  getApplicantById(applicantId: string): void {
    this.applicantService.getApplicantById(applicantId).subscribe(
      (response: GetbyidApplicantResponse) => {
        this.getApplicantByIdResponse = response;
      },
      (error: any) => {
        console.error('Error fetching applicant:', error);
    }
    );
  }  
}

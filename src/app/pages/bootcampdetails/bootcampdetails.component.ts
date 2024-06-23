import { Component, OnInit } from '@angular/core';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GetbyidBootcampResponse } from '../../features/models/responses/bootcamp/getbyid-bootcamp-response';
import { UserService } from '../../features/services/concretes/user.service';
import { BootcampListService } from '../../features/services/concretes/bootcamplist.service';
import { AuthService } from '../../features/services/concretes/auth.service';
import { BootcampApplicationService } from '../../features/services/concretes/bootcampApplication.service';
import { CheckRegisteredRequest } from '../../features/models/requests/bootcampapplication/check-registered-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bootcampdetails',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './bootcampdetails.component.html',
  styleUrls: ['./bootcampdetails.component.scss'],
})
export class BootcampdetailsComponent implements OnInit {
  getbyIdBootcampResponse: GetbyidBootcampResponse | undefined;
  showApplyButton = true;
  showAttendButton = false;
  
  constructor(
    private bootcampService: BootcampService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private bootcampListService: BootcampListService,
    private authService: AuthService,
    private bootcampApplicationService: BootcampApplicationService
  ) { }

  ngOnInit(): void {
    this.loadBootcamps();
    this.checkRegistered();
  }

  loadBootcamps(): void {
    const bootcampId = this.activatedRoute.snapshot.params['id'];
    this.bootcampService.getBootcampById(bootcampId).subscribe(
      (response) => {
        this.userService.userinfo({ ıd: response.instructorId }).subscribe(
          (userInfoResponse) => {
            response.instructorFirstName = userInfoResponse.firstName;
            response.instructorLastName = userInfoResponse.lastName;
            this.getbyIdBootcampResponse = response; 
          },
          (error) => {
            console.error('Error fetching user info', error);
            this.getbyIdBootcampResponse = response;
          }
        );
      },
      (error) => {
        console.error('Error loading bootcamps', error);
      }
    );
  }

  applyToBootcamp(bootcampId: number | undefined): void {
    if (bootcampId !== undefined) {
      this.bootcampListService.applyToBootcamp(bootcampId);
    } else {
      console.error('Bootcamp ID is undefined');
    }
  }

  checkRegistered(): void {
    if (this.authService.loggedIn()) {
      const applicantId = this.authService.getCurrentUserId();
      const bootcampId = this.activatedRoute.snapshot.params['id'];

      const checkRegisteredRequest: CheckRegisteredRequest = {
        bootcampId: bootcampId,
        applicantId: applicantId
      };

      this.bootcampApplicationService.CheckRegistered(checkRegisteredRequest).subscribe(
        (response) => {
          console.log('Check Registered Response:', response);
          this.showApplyButton = !response;
          this.showAttendButton = response; 
        },
        (error) => {
          console.error('Error checking registration status', error);
        }
      );
    }
  }

}

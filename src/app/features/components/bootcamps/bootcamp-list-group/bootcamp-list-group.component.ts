import { CommonModule } from '@angular/common';
import { PageRequest } from '../../../../core/models/page-request';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BootcampListDto } from '../../../models/responses/bootcamp/bootcamp-list-item-dto';
import { UserService } from '../../../services/concretes/user.service';
import { AuthService } from '../../../services/concretes/auth.service';
import { BootcampApplicationService } from '../../../services/concretes/bootcampApplication.service';
import { BootcampItem } from '../../../models/responses/bootcamp/get-bootcamps-response';
import { BootcampApplicationRequest } from '../../../models/requests/bootcampapplication/bootcamp-application-request';

@Component({
  selector: 'app-bootcamp-list-group',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './bootcamp-list-group.component.html',
  styleUrl: './bootcamp-list-group.component.scss'
})
export class BootcampListGroupComponent implements OnInit {

  bootcamps: BootcampItem[] | any = null; 
  error: any;
  currentPageNumber!: number; 
  bootcampList: BootcampListDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  }; 

  constructor(
    private bootcampService: BootcampService,
    private userService: UserService,
    private authService: AuthService,
    private bootcampApplicationService: BootcampApplicationService
  ) { }

  readonly PAGE_SIZE = 3;

  ngOnInit(): void {
    this.loadBootcamps({ page: 0, pageSize: this.PAGE_SIZE });
  }
  


  loadBootcamps(pageRequest: PageRequest): void {
    this.bootcampService.getList(pageRequest).subscribe(
      (response: BootcampListDto) => {
        if (response && response.items) {
          const bootcampItems = response.items.map(bootcamp => {
            this.userService.userinfo({ ıd: bootcamp.instructorId }).subscribe(
              (userInfoResponse) => {
                bootcamp.instructorName = `${userInfoResponse.firstName} ${userInfoResponse.lastName}`;
              },
              (error) => {
                console.error('Error fetching user info', error);
              }
            );
            if(this.authService.loggedIn())
            {
              const applicantId = this.authService.getCurrentUserId();
              this.bootcampApplicationService.CheckBootcamp(bootcamp.id).subscribe(
                (checkResponse) => {
                  bootcamp.isRegistered = checkResponse.applicantId === applicantId;
                },
                (error) => {
                  console.error('Error checking bootcamp registration', error);
                  bootcamp.isRegistered = false;
                }
              );
            }
            return bootcamp;
          });

          this.bootcamps = bootcampItems;
          this.bootcampList = response;
        } else {
          console.error('Response or items array is null.');
        }
      },
      (error) => {
        this.error = error;
        console.error('Error fetching bootcamps', error);
      }
    );
  }

  applyToBootcamp(bootcampId: number): void {
    const applicantId = this.authService.getCurrentUserId();
    const applicationRequest: BootcampApplicationRequest = { bootcampId, applicantId };
    this.bootcampApplicationService.apply(applicationRequest).subscribe(
      (response) => {
        console.log('Başvuru başarılı', response);
      },
      (error) => {
        console.error('Başvuru hatası', error);
      }
    );
  }

  
}
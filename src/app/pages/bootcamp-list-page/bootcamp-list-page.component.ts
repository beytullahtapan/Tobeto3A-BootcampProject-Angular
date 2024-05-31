import { Component, OnInit } from '@angular/core';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { UserService } from '../../features/services/concretes/user.service';
import { BootcampItem } from '../../features/models/responses/bootcamp/get-bootcamps-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BootcampListDto } from '../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { PageRequest } from '../../core/models/page-request';
import { BootcampApplicationRequest } from '../../features/models/requests/bootcampapplication/bootcamp-application-request';
import { AuthService } from '../../features/services/concretes/auth.service';
import { BootcampApplicationService } from '../../features/services/concretes/bootcampApplication.service';
import { AppToastrService, ToastrMessageType } from '../../features/services/concretes/app-toastr.service';

@Component({
  selector: 'app-bootcamp-list-page',
  standalone: true,
  templateUrl: './bootcamp-list-page.component.html',
  styleUrls: ['./bootcamp-list-page.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class BootcampListPageComponent implements OnInit {
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
    private bootcampApplicationService: BootcampApplicationService,
    private toastrService:AppToastrService,
    private router: Router
  ) { }

  readonly PAGE_SIZE = 5;

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
  
  
  onViewMoreClicked(): void {
    const nextPageIndex = this.bootcampList.index + 1;
    const pageSize = this.bootcampList.size;
    this.loadBootcamps({ page: nextPageIndex, pageSize });
    this.updateCurrentPageNumber();     
  }

  onPreviousPageClicked(): void {
    const previousPageIndex = this.bootcampList.index - 1;
    const pageSize = this.bootcampList.size;
    this.loadBootcamps({ page: previousPageIndex, pageSize });
    this.updateCurrentPageNumber();               
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index + 1;
  }   

  applyToBootcamp(bootcampId: number): void {
    if(this.authService.loggedIn()){
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
    }else{
       this.toastrService.message("Bootcamp'e Başvurmak  için  giriş yapmalısınız.", "Hata!", ToastrMessageType.Error);
        this.router.navigate(['/login']);
    }
  }
}

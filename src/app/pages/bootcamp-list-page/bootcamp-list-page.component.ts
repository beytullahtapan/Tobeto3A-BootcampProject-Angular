import { Component, OnInit } from '@angular/core';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { UserService } from '../../features/services/concretes/user.service';
import { ListBootcampResponse, BootcampItem } from '../../features/models/responses/bootcamp/get-bootcamps-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ListBootcampRequest } from '../../features/models/requests/bootcamp/get-bootcamp-request';
import { BootcampApplicationRequest } from '../../features/models/requests/bootcampapplication/bootcamp-application-request';
import { BootcampApplicationService } from '../../features/services/concretes/bootcampApplication.service';
import { AuthService } from '../../features/services/concretes/auth.service';
import { AppToastrService, ToastrMessageType } from '../../features/services/concretes/app-toastr.service';
import { forkJoin, map, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-bootcamp-list-page',
  standalone: true,
  templateUrl: './bootcamp-list-page.component.html',
  styleUrls: ['./bootcamp-list-page.component.scss'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class BootcampListPageComponent implements OnInit {
  bootcamps: BootcampItem[] | null = null; 
  error: any;

  constructor(
    private bootcampService: BootcampService,
    private userService: UserService,
    private bootcampApplicationService: BootcampApplicationService,
    private autService: AuthService,
    private toastrService:AppToastrService,
    private router: Router,

  ) { }

  readonly PAGE_SIZE = 10;

  ngOnInit(): void {
    this.loadBootcamps();
  }

  loadBootcamps(): void {
    const request: ListBootcampRequest = { pageIndex: 0, pageSize: 5 };
    this.bootcampService.GetBootcamp(request).subscribe(
      (response: ListBootcampResponse) => {
        if (response && response.items) {
          const bootcamps = response.items;
          
          const bootcampObservables = bootcamps.map(bootcamp => 
            this.userService.userinfo({ ıd: bootcamp.instructorId }).pipe(
              mergeMap(userInfoResponse => {
                bootcamp.InsturctorName = `${userInfoResponse.firstName} ${userInfoResponse.lastName}`;
                
                if (this.autService.loggedIn()) {
                  const applicantId = this.autService.getCurrentUserId();
                  return this.bootcampApplicationService.CheckBootcamp(bootcamp.id).pipe(
                    map(checkResponse => {
                      bootcamp.isRegistered = checkResponse.applicantId === applicantId;
                      return bootcamp;
                    })
                  );
                } else {
                  return of(bootcamp);
                }
              })
            )
          );
          forkJoin(bootcampObservables).subscribe(
            updatedBootcamps => {
              this.bootcamps = updatedBootcamps;
            },
            error => {
              console.error('Error processing bootcamps', error);
            }
          );
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
    if(this.autService.loggedIn())
    {
        const applicantId = this.autService.getCurrentUserId();
        const applicationRequest: BootcampApplicationRequest = { bootcampId, applicantId };
        this.bootcampApplicationService.apply(applicationRequest).subscribe(
          (response) => {
            this.toastrService.message("Bootcamp Kayıt Olundu!.", "Başarılı!", ToastrMessageType.Success);
            this.loadBootcamps();
          },
          (error) => {
            console.error('Başvuru hatası', error);
          }
        );
      }else{
        this.toastrService.message("Bootcamp'e kayıt olmak için giriş yapmalısınız.", "Hata!", ToastrMessageType.Error);
        this.router.navigate(['/login']);
      }
    }
}

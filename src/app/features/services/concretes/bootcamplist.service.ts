import { Injectable } from '@angular/core';
import { BootcampApplicationRequest } from '../../models/requests/bootcampapplication/bootcamp-application-request';
import { Observable, map } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { BootcampApplicationService } from './bootcampApplication.service';
import { AppToastrService, ToastrMessageType } from './app-toastr.service';
import { BootcampListDto } from '../../models/responses/bootcamp/bootcamp-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampService } from './bootcamp.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BootcampListService {
    
  constructor(
    private bootcampService: BootcampService,
    private userService: UserService,
    private authService: AuthService,
    private bootcampApplicationService: BootcampApplicationService,
    private toastrService: AppToastrService,
    private router: Router
  ) { }

  loadBootcamps(pageRequest: PageRequest): Observable<BootcampListDto> {
    return this.bootcampService.getList(pageRequest).pipe(
      map((response: BootcampListDto) => {
        if (response && response.items) {
          response.items.forEach(bootcamp => {
            this.userService.userinfo({ ıd: bootcamp.instructorId }).subscribe(
              (userInfoResponse) => {
                bootcamp.instructorName = `${userInfoResponse.firstName} ${userInfoResponse.lastName}`;
              },
              (error) => {
                console.error('Error fetching user info', error);
              }
            );

            if (this.authService.loggedIn()) {
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
          });
        } else {
          console.error('Response or items array is null.');
        }
        return response;
      })
    );
  }

  applyToBootcamp(bootcampId: number): void {
    if (this.authService.loggedIn()) {
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
    } else {
      this.toastrService.message("Bootcamp'e Başvurmak için giriş yapmalısınız.", "Hata!", ToastrMessageType.Error);
      this.router.navigate(['/login']);
    }
  }

  
}

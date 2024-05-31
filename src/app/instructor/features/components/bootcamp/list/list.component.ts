import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { BootcampItem } from '../../../models/responses/bootcamp/listbootcampresponse';
import { ListBootcampRequest } from '../../../models/requests/bootcamp/listbootcamprequest';
import { InstructorBootcamp } from '../../../services/concretes/bootcamp.service';
import { AuthService } from '../../../../../features/services/concretes/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../../features/services/concretes/user.service';
import { RouterModule } from '@angular/router';
import { DeleteBootcampImageRequest } from '../../../models/requests/bootcamp/deletebootcampımagerequest';
import { catchError, mergeMap, switchMap, tap } from 'rxjs';
import { BootcampListDto } from '../../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { PageRequest } from '../../../../../core/models/page-request';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListInstructorBootcampComponent implements OnInit {
  bootcamps: BootcampItem[] | any = null; 
  bootcampForm: FormGroup;
  error: any;
  currentPageNumber!: number; 
  readonly PAGE_SIZE = 10;
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
    private bootcampService: InstructorBootcamp,
    private fb: FormBuilder,
    private autService: AuthService,
    private userService: UserService 
  ) {
    this.bootcampForm = this.fb.group({
      instructorId: [''],
      pageIndex: [0],
      pageSize: [3],
    });
  }

  ngOnInit(): void {
    initFlowbite();
    this.loadBootcamps({ page: 0, pageSize: this.PAGE_SIZE })
  }


  loadBootcamps(pageRequest: PageRequest): void {
    const instructorId = this.autService.getCurrentUserId();
    this.bootcampService.list(pageRequest,instructorId).subscribe(
      (response) => {
        if (response) {
          response.items.forEach(bootcamp => {
            this.userService.userinfo({ ıd: bootcamp.instructorId }).subscribe(
              (userInfoResponse) => {
                bootcamp.instructorName = `${userInfoResponse.firstName} ${userInfoResponse.lastName}`;
              },
              (error) => {
                console.error('Error fetching user info', error);
              }
            );
          });
          this.bootcamps = [response];
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

  DeleteBootcamp(bootcampId: number): void {
    if (confirm("Bu bootcamp'i silmek istediğinizden emin misiniz?")) {
      this.bootcampService.getBootcampById(bootcampId).pipe(
        mergeMap((bootcamp) => {
          let deleteimageModel: DeleteBootcampImageRequest = {
            Url: bootcamp.bootcampImage 
          };
          console.log("gelen url" + deleteimageModel.Url)
          return this.bootcampService.deleteimage(deleteimageModel).pipe(
            tap((response) => console.log("Bootcamp image deleted successfully: ", response)),
            catchError((error) => {
              console.error('Error deleting bootcamp image:', error);
              throw error;
            }),
            switchMap(() => this.bootcampService.deletebootcamp(bootcampId))
          );
        })
      ).subscribe(
        (response) => {
          console.log("Bootcamp deleted successfully: ", response);
          this.loadBootcamps({ page: 0, pageSize: this.PAGE_SIZE })
        },
        (error) => {
          console.error('Error deleting bootcamp:', error);
        }
      );
    }
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


  

}

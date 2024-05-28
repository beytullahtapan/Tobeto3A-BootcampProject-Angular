import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { ListBootcampResponse } from '../../../models/responses/bootcamp/listbootcampresponse';
import { ListBootcampRequest } from '../../../models/requests/bootcamp/listbootcamprequest';
import { InstructorBootcamp } from '../../../services/concretes/bootcamp.service';
import { AuthService } from '../../../../../features/services/concretes/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../../features/services/concretes/user.service';
import { RouterModule } from '@angular/router';
import { DeleteBootcampImageRequest } from '../../../models/requests/bootcamp/deletebootcampımagerequest';
import { catchError, mergeMap, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListInstructorBootcampComponent implements OnInit {
  bootcamps: ListBootcampResponse[] | null = null; // Specify the type here
  bootcampForm: FormGroup;
  error: any;

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
    this.loadBootcamps();
  }


  loadBootcamps(): void {
    const instructorId = this.autService.getCurrentUserId();
    const request: ListBootcampRequest = { InstructorId: instructorId, pageIndex: 0, pageSize: 5 };
    this.bootcampService.list(request).subscribe(
      (response) => {
        if (response) {
          response.items.forEach(bootcamp => {
            this.userService.userinfo({ ıd: bootcamp.instructorId }).subscribe(
              (userInfoResponse) => {
                bootcamp.InsturctorName = `${userInfoResponse.firstName} ${userInfoResponse.lastName}`;
              },
              (error) => {
                console.error('Error fetching user info', error);
              }
            );
          });
          this.bootcamps = [response];

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
          this.loadBootcamps(); // Bootcamps listesini yeniden yükleyin
        },
        (error) => {
          console.error('Error deleting bootcamp:', error);
        }
      );
    }
  }
  

}

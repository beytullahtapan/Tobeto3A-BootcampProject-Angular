import { Component, OnInit } from '@angular/core';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { UserService } from '../../features/services/concretes/user.service';
import { ListBootcampResponse, BootcampItem } from '../../features/models/responses/bootcamp/get-bootcamps-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListBootcampRequest } from '../../features/models/requests/bootcamp/get-bootcamp-request';

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
    private userService: UserService
  ) { }

  readonly PAGE_SIZE = 10;

  ngOnInit(): void {
    this.loadBootcamps();
  }

  loadBootcamps(): void {
    const request: ListBootcampRequest = {  pageIndex: 0, pageSize: 5 };
    this.bootcampService.GetBootcamp(request).subscribe(
      (response: ListBootcampResponse) => {
        if (response && response.items) {
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
          this.bootcamps = response.items;
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
}

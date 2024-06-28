import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { InstructorBootcamp } from '../../../services/concretes/bootcamp.service';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../../features/services/concretes/auth.service';
import { UserService } from '../../../../../features/services/concretes/user.service';
import { PageRequest } from '../../../../../core/models/page-request';
import { StudentService } from '../../../services/concretes/student.service';
import { StudentListItem } from '../../../models/responses/student/student-list-response';
import { StudentListItemDto } from '../../../models/responses/student/student-list-item-dto';
import { UserForInfoResponse } from '../../../../../features/models/responses/users/user-info-response';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class InstructorStudentListComponent implements OnInit {
  students: StudentListItem[] = [];  
  error: any;
  currentPageNumber!: number;
  readonly PAGE_SIZE = 10;

  ngOnInit(): void {
    initFlowbite();
    this.GetStudent({ page: 0, pageSize: this.PAGE_SIZE });
  }

  constructor(
    private bootcampService: InstructorBootcamp,
    private fb: FormBuilder,
    private autService: AuthService,
    private userService: UserService,
    private studentService: StudentService
  ) {}

  GetStudent(pageRequest: PageRequest): void {
    const instructorId = this.autService.getCurrentUserId();
    this.bootcampService.list(pageRequest, instructorId).subscribe((response) => {
      if (response) {
        response.items.forEach(bootcamp => {
          this.studentService.getBootcampById(pageRequest, bootcamp.id).subscribe((bootcampResponse) => {
            if (bootcampResponse && bootcampResponse.items && bootcampResponse.items.length > 0) {
              bootcampResponse.items.forEach(item => {
                this.userService.studentinfo({ ıd: item.applicantId }).subscribe(
                  (userinfo) => {
                    this.students.push(userinfo);
                  }
                );
              });
            } else {
              console.log("Herhangi bir öğrenci yok.");
            }
          });
        });
      }
    });
  }
}

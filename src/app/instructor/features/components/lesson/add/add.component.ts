import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { BootcampService } from '../../../../../features/services/concretes/bootcamp.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../features/services/concretes/auth.service';
import { AppToastrService, ToastrMessageType } from '../../../../../features/services/concretes/app-toastr.service';
import { InstructorBootcamp } from '../../../services/concretes/bootcamp.service';
import { UserService } from '../../../../../features/services/concretes/user.service';
import { ListBootcampRequest } from '../../../models/requests/bootcamp/listbootcamprequest';
import { BootcampItem } from '../../../models/responses/bootcamp/listbootcampresponse';
import { AddLessonRequest } from '../../../models/requests/lesson/addlessonrequest';
import { InstructorLessonBaseService } from '../../../services/abstracts/lesson-base.service';
import { InstructorLessonService } from '../../../services/concretes/lesson.service';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddInstructorLessonComponent implements OnInit {
  bootcamps: BootcampItem[] | null = null;
  error: any;
  LessonaddForm!: FormGroup;


  

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bootcampService: InstructorBootcamp,
    private lessonService: InstructorLessonService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: AppToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.loadBootcamps();
    this.initForm();
  }

  initForm(): void {
    this.LessonaddForm = this.formBuilder.group({
      title: [""],
      bootcampId: [""],  
    });
  }

  loadBootcamps(): void {
    const instructorId = this.authService.getCurrentUserId();
    const request: ListBootcampRequest = { InstructorId: instructorId, pageIndex: 0, pageSize: 100 };

    this.bootcampService.list(request).subscribe(
      (response) => {
        if (response && response.items) {
          this.bootcamps = response.items;
          console.log("gelen bootcampler" + this.bootcamps);
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



  Addlesson(): void {
    if (this.LessonaddForm.valid) {
        let addLessonModel: AddLessonRequest = Object.assign({}, this.LessonaddForm.value);
        console.log("gelen id" +addLessonModel.bootcampId);
        console.log("gelen title" + addLessonModel.title);
        this.lessonService.add(addLessonModel).subscribe(
          (response) => {
              
              this.toastrService.message("Lesson Başarıyla Eklendi.", "Başarılı!", ToastrMessageType.Success);
              this.router.navigate(['/instructor/lesson/list']);
          },
          (error) => {
              this.toastrService.message("Lesson Eklenemedi..", "Hata!", ToastrMessageType.Error);
          }
      );
                
    } else {
        this.toastrService.message("Form doğrulama hatası..", "Hata!", ToastrMessageType.Error);
    }
}
}


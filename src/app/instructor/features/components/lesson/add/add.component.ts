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
import { InstructorLessonContentService } from '../../../services/concretes/lessoncontent.service';
import { AddLessonContentRequest } from '../../../models/requests/lesson/addlessoncontentrequest';

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
    private lessonContentService: InstructorLessonContentService
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
        this.lessonService.add(addLessonModel).subscribe(
            (lessonResponse) => {
                const lessonId = lessonResponse.id;

                let addLessonContentRequest: AddLessonContentRequest = {
                    text: 'İçerik Buraya Gelcek',
                    videoUrl: 'Video Linki Buraya gelecek',
                    lessonId: lessonId
                };

                this.lessonContentService.add(addLessonContentRequest).subscribe(
                    () => {
                        this.toastrService.message("Lesson and content successfully added.", "Success", ToastrMessageType.Success);
                        this.router.navigate([`/instructor/lesson/list/${addLessonModel.bootcampId}`]);
                    },
                    (error) => {
                        console.error("Error adding lesson content:", error);
                        this.toastrService.message("Error adding lesson content.", "Error", ToastrMessageType.Error);
                    }
                );
            },
            (error) => {
                console.error("Error adding lesson:", error);
                this.toastrService.message("Error adding lesson.", "Error", ToastrMessageType.Error);
            }
        );               
    } else {
        this.toastrService.message("Form validation error.", "Error", ToastrMessageType.Error);
    }
}


}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../features/services/concretes/auth.service';
import { AppToastrService, ToastrMessageType } from '../../../../../features/services/concretes/app-toastr.service';
import { InstructorBootcamp } from '../../../services/concretes/bootcamp.service';
import { UserService } from '../../../../../features/services/concretes/user.service';
import { PageRequest } from '../../../../../core/models/page-request';
import { BootcampItem } from '../../../models/responses/bootcamp/listbootcampresponse';
import { AddLessonRequest } from '../../../models/requests/lesson/addlessonrequest';
import { InstructorLessonService } from '../../../services/concretes/lesson.service';
import { InstructorLessonContentService } from '../../../services/concretes/lessoncontent.service';
import { AddLessonContentRequest } from '../../../models/requests/lesson/addlessoncontentrequest';
import { HttpClientModule } from '@angular/common/http';
import { BootcampListDto } from '../../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule,CommonModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddInstructorLessonComponent implements OnInit {
  bootcamps: BootcampItem[] | any = null; 
  error: any;
  LessonaddForm!: FormGroup;
  currentPageNumber!: number;   
  readonly PAGE_SIZE = 5;
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bootcampService: InstructorBootcamp,
    private lessonService: InstructorLessonService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: AppToastrService,
    private userService: UserService,
    private lessonContentService: InstructorLessonContentService,
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.initForm();
  }

  initForm(): void {
    this.LessonaddForm = this.formBuilder.group({
      title: [""],
      bootcampId: [""],
    });
  }


  Addlesson(): void {
    if (this.LessonaddForm.valid) {
      const bootcampId = this.activatedRoute.snapshot.params['id'];
      let addLessonModel: AddLessonRequest = Object.assign({}, this.LessonaddForm.value);
      addLessonModel.bootcampId = bootcampId;
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

import { Component, OnInit } from '@angular/core';
import { InstructorBootcamp } from '../../../services/concretes/bootcamp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../../features/services/concretes/auth.service';
import { LessonItem, ListLessonResponse } from '../../../models/responses/lesson/listlessonresponse';
import { InstructorLessonService } from '../../../services/concretes/lesson.service';
import { ListBootcampRequest } from '../../../models/requests/bootcamp/listbootcamprequest';
import { ListBootcampResponse } from '../../../models/responses/bootcamp/listbootcampresponse';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppToastrService, ToastrMessageType } from '../../../../../features/services/concretes/app-toastr.service';
import { ListLessonRequest } from '../../../models/requests/lesson/listlessonrequest';
import { from, mergeMap } from 'rxjs';
import { InstructorLessonContentService } from '../../../services/concretes/lessoncontent.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListInstructorLessonComponent implements OnInit {
  ngOnInit(): void {
    this.loadLesson();
  }

  lessons: LessonItem[] | null = null;
  bootcamps: ListBootcampResponse[] | null = null;
  error: any;

  constructor(
    private bootcampService: InstructorBootcamp,
    private lessonService: InstructorLessonService,
    private lessoncontentService: InstructorLessonContentService,
    private toastrService: AppToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  

  loadLesson(): void {
    const bootcampId = this.activatedRoute.snapshot.params['id'];
    const request: ListLessonRequest = { BootcampId: bootcampId, pageIndex: 0, pageSize: 5 };

    // Get bootcamp details by bootcampId
    this.bootcampService.getBootcampById(bootcampId).subscribe(
      (bootcamp) => {
        // Subscribe to getLessonlist
        this.lessonService.getLessonlist(request).subscribe(
          (response) => {
            if (response && response.items) {
              // Assign lessons and bootcampName
              this.lessons = response.items.map((lesson) => {
                lesson.bootcampName = bootcamp.name; // Assuming bootcamp name is stored in 'name' property
                return lesson;
              });
            } else {
              console.error('Response or items array is null.');
            }
          },
          (error) => {
            this.error = error;
            console.error('Error fetching bootcamps', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching bootcamp details', error);
      }
    );
}

  
DeleteLesson(lessonId: number): void {
  if (confirm("Bu Lessonu'i silmek istediğinizden emin misiniz?")) {
      this.lessoncontentService.deletelessoncontent(lessonId).subscribe((deletecontent) => {
        this.lessonService.deletelesson(lessonId).subscribe(
          (deleteresponse) => {
            this.toastrService.message("Lesson Başarıyla Silindi.", "Başarılı!", ToastrMessageType.Success);
            this.loadLesson();
          },
          (error) => {
              console.error("Silme işlemi sırasında bir hata oluştu: ", error);
          }
      );
  });
}
}


}


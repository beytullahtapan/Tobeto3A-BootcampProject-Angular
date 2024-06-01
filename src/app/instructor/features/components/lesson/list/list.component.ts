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
import { LessonListDto } from '../../../../../features/models/responses/viewbootcamp/lesson-list-item-dto';
import { PageRequest } from '../../../../../core/models/page-request';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListInstructorLessonComponent implements OnInit {
  ngOnInit(): void {
    this.loadLesson({ page: 0, pageSize: this.PAGE_SIZE })
  }

  lessons: LessonItem[] | null = null;
  bootcamps: ListBootcampResponse[] | null = null;
  error: any;
  currentPageNumber!: number;   
  readonly PAGE_SIZE = 10;
  lessonList: LessonListDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  constructor(
    private InstructorBootcampService: InstructorBootcamp,
    private lessonService: InstructorLessonService,
    private lessoncontentService: InstructorLessonContentService,
    private toastrService: AppToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  

  loadLesson(pageRequest: PageRequest): void {
    const bootcampId = this.activatedRoute.snapshot.params['id'];
    
    this.InstructorBootcampService.getBootcampById(bootcampId).subscribe(
      (bootcamp) => {
          this.lessonService.getLessonlist(pageRequest, bootcampId).subscribe(
          (response: LessonListDto) => {
            if (response && response.items) {
              this.lessons = response.items.map((lesson) => {
                lesson.bootcampName = bootcamp.name;
                return lesson;
              });

              this.lessonList.index = response.index;
              this.lessonList.size = response.size;
              this.lessonList.count = response.count;
              this.lessonList.hasNext = response.hasNext;
              this.lessonList.hasPrevious = response.hasPrevious;
              this.lessonList.pages = response.pages;
            } else {
              console.error('Response or items array is null.');
            }
          },
          (error) => {
            this.error = error;
            console.error('Error fetching lessons', error);
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

          },
          (error) => {
              console.error("Silme işlemi sırasında bir hata oluştu: ", error);
          }
      );
  });
}
}

onViewMoreClicked(): void {
  const nextPageIndex = this.lessonList.index + 1;
  const pageSize = this.lessonList.size;
  this.loadLesson({ page: nextPageIndex, pageSize });
}

onPreviousPageClicked(): void {
  const previousPageIndex = this.lessonList.index - 1;
  const pageSize = this.lessonList.size;
  this.loadLesson({ page: previousPageIndex, pageSize });
}

updateCurrentPageNumber(): void {
  this.currentPageNumber = this.lessonList.index + 1;
}
}


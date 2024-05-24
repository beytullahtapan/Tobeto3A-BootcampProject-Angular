import { Component, OnInit } from '@angular/core';
import { InstructorBootcamp } from '../../../services/concretes/bootcamp.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../../features/services/concretes/auth.service';
import { ListLessonResponse } from '../../../models/responses/lesson/listlessonresponse';
import { InstructorLessonService } from '../../../services/concretes/lesson.service';
import { ListBootcampRequest } from '../../../models/requests/bootcamp/listbootcamprequest';
import { ListBootcampResponse } from '../../../models/responses/bootcamp/listbootcampresponse';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AppToastrService, ToastrMessageType } from '../../../../../features/services/concretes/app-toastr.service';

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
    this.initStepNavigation();
  }

  lessons: ListLessonResponse[] | null = null;
  bootcamps: ListBootcampResponse[] | null = null;
  error: any;

  constructor(
    private bootcampService: InstructorBootcamp,
    private lessonService: InstructorLessonService,
    private authService: AuthService,
    private toastrService: AppToastrService,
  ) {}

  

  loadLesson(): void {
    const instructorId = this.authService.getCurrentUserId();
    const request: ListBootcampRequest = { InstructorId: instructorId, pageIndex: 0, pageSize: 5 };
  
    this.bootcampService.list(request).subscribe(
      (response) => {
        if (response && response.items.length > 0) {
          // Array to accumulate all fetched lessons
          const allLessons: ListLessonResponse[] = [];
  
          response.items.forEach(bootcamp => {
            this.lessonService.list({ BootcampId: bootcamp.id, pageIndex: 0, pageSize: 5 }).subscribe(
              (lessonResponse) => {
                if (lessonResponse && lessonResponse.items.length > 0) {
                  lessonResponse.items.forEach(lesson => {
                    lesson.bootcampName = bootcamp.name;
                  });
                  // Accumulate fetched lessons
                  allLessons.push(lessonResponse);
                } 
              },
              (error) => {
                console.error('Error fetching lessons', error);
              }
            );
          });
  
          // After all lessons are fetched, assign them to this.lessons
          this.lessons = allLessons;
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
  
  DeleteLesson(lessonId: number): void {
    if (confirm("Bu bootcamp'i silmek istediğinizden emin misiniz?")) {
        this.lessonService.deletelesson(lessonId).subscribe(
            (deleteresponse) => {
              this.toastrService.message("Lesson Başarıyla Silindi.", "Başarılı!", ToastrMessageType.Success);
              this.loadLesson();
            },
            (error) => {
                console.error("Silme işlemi sırasında bir hata oluştu: ", error);
            }
        );
    }
}

initStepNavigation(): void {
  const steps = document.querySelectorAll('.step') as NodeListOf<HTMLElement>;
  const panes = document.querySelectorAll('.step-pane') as NodeListOf<HTMLElement>;
  const prevButton = document.getElementById('prevStep');
  const nextButton = document.getElementById('nextStep');

  let currentStep = 1;

  function updateSteps() {
    steps.forEach(step => {
      const stepDataStep = step.getAttribute('data-step');
      if (stepDataStep !== null) {
        const stepNumber = parseInt(stepDataStep);
        step.classList.toggle('step-active', stepNumber === currentStep);
      }
    });
    panes.forEach(pane => {
      const paneDataStep = pane.getAttribute('data-step');
      if (paneDataStep !== null) {
        const paneNumber = parseInt(paneDataStep);
        pane.classList.toggle('step-pane-active', paneNumber === currentStep);
      }
    });
  }

  prevButton?.addEventListener('click', function () {
    if (currentStep > 1) {
      currentStep--;
      updateSteps();
    }
  });

  nextButton?.addEventListener('click', function () {
    if (currentStep < steps.length) {
      currentStep++;
      updateSteps();
    }
  });

  updateSteps();
}


}


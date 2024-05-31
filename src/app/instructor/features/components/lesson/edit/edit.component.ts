import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { GetByidLessonRequest } from '../../../models/requests/lesson/getbyidrequest';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorBootcamp } from '../../../services/concretes/bootcamp.service';
import { InstructorLessonService } from '../../../services/concretes/lesson.service';
import { AuthService } from '../../../../../features/services/concretes/auth.service';
import { ListBootcampRequest } from '../../../models/requests/bootcamp/listbootcamprequest';
import { BootcampItem } from '../../../models/responses/bootcamp/listbootcampresponse';
import { GetByidLessonResponse } from '../../../models/responses/lesson/getbyidresponse';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UpdateLessonRequest } from '../../../models/requests/lesson/updatelessonrequest';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditInstructorLessonComponent implements OnInit {
  getbyIdLessonResponse?: GetByidLessonResponse;
  lessonForm!: FormGroup;
  bootcamps: BootcampItem[] | null = null;
  error: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bootcampService: InstructorBootcamp,
    private formBuilder: FormBuilder,
    private lessonService: InstructorLessonService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.initForm();
    this.loadData();
  }

  initForm(): void {
    this.lessonForm = this.formBuilder.group({
      id: [""],
      title: [""],
      bootcampId: [""],
    });
  }

  async loadData(): Promise<void> {
    try {
      await Promise.all([this.getLesson()]);
      this.patchForm();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  

  async getLesson(): Promise<void> {
    const lessonId = this.activatedRoute.snapshot.params['id'];
    return new Promise((resolve, reject) => {
      this.lessonService.getbyid({ LessonId: lessonId } as GetByidLessonRequest).pipe(
        catchError(error => {
          console.error('Error fetching lesson:', error);
          return of(null);
        })
      ).subscribe((response: GetByidLessonResponse | null) => {
        if (response) {
          this.getbyIdLessonResponse = response;
          console.log("gelen response" + this.getbyIdLessonResponse);
          resolve();
        } else {
          console.error('Response is null.');
          reject('Response is null.');
        }
      });
    });
  }

  patchForm(): void {
    if (this.getbyIdLessonResponse) {
      console.log('getbyIdLessonResponse:', this.getbyIdLessonResponse);
      this.lessonForm.patchValue({
        title: this.getbyIdLessonResponse.title,
        bootcampId: this.getbyIdLessonResponse.bootcampId,
        id: this.getbyIdLessonResponse.id
      });
    }
  }

  UpdateLesson(): void {
    if (this.lessonForm.valid) {
      let lessonModel: UpdateLessonRequest = Object.assign({}, this.lessonForm.value);
      console.log("gelen bootcampıd" + lessonModel.bootcampId);
      this.lessonService.updateLesson(lessonModel).subscribe((updatelesson) => {
        console.log("güncelleme başarılı !"+ updatelesson)
     },
     (error) => {
      console.error('Error updating lesson:', error);
     });
    }
  }
}

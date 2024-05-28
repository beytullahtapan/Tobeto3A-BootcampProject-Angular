import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { initFlowbite } from 'flowbite';
import { InstructorLessonContentService } from '../../../services/concretes/lessoncontent.service';
import { AuthService } from '../../../../../features/services/concretes/auth.service';
import { AppToastrService, ToastrMessageType } from '../../../../../features/services/concretes/app-toastr.service';
import { AddLessonContentRequest } from '../../../models/requests/lesson/addlessoncontentrequest';
import { HttpClientModule } from '@angular/common/http';
import { GetByidLessonResponse } from '../../../models/responses/lesson/getbyidresponse';
import { GetByContentResponse } from '../../../models/responses/lesson/content/getbycontentresponse';
import { UpdateContentRequest } from '../../../models/requests/lesson/content/updatecontentrequest';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, EditorModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class InstructorContentComponent implements OnInit {
  error: any;
  LessoncontentForm!: FormGroup;
  getcontent!: GetByContentResponse;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private lessonContentService: InstructorLessonContentService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: AppToastrService
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.initForm();
    this.getLesson();
  }

  initForm(): void {
    this.LessoncontentForm = this.formBuilder.group({
      text: [""],
      videoUrl: [""],
      lessonId: [],
      id:[]
    });
  }

  getLesson(): void{
    const lessonId = this.activatedRoute.snapshot.params['id'];
    this.lessonContentService.getcontent(lessonId).subscribe((response: GetByContentResponse) => {
      this.getcontent = response;
      this.LessoncontentForm.patchValue(response);
    },
    (error: any) => {
      console.error('Error fetching bootcamp:', error);
      console.log("Error retrieving bootcamp");
    }
  );
  }

  UpdateLessonContent(): void {
    if (this.LessoncontentForm.valid) {
      const lessoncontentModel: UpdateContentRequest = { ...this.LessoncontentForm.value };
      this.lessonContentService.updatecontent(lessoncontentModel).subscribe(
        (updatelesson) => {
          console.log("güncelleme başarılı: " + updatelesson);
        },
        (error) => {
          console.error('Error updating lesson:', error);
        }
      );
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ViewBootcampService } from '../../features/services/concretes/viewbootcamp.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GetbyIdBootcampResponse } from '../../instructor/features/models/responses/bootcamp/getbyidbootcampresponse';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InstructorLessonService } from '../../instructor/features/services/concretes/lesson.service';
import { InstructorBootcamp } from '../../instructor/features/services/concretes/bootcamp.service';
import { ListLessonRequest } from '../../instructor/features/models/requests/lesson/listlessonrequest';
import { LessonItem } from '../../instructor/features/models/responses/lesson/listlessonresponse';
import { CommonModule } from '@angular/common';
import { GetByContentResponse } from '../../instructor/features/models/responses/lesson/content/getbycontentresponse';
import { GetByContentRequest } from '../../instructor/features/models/requests/lesson/content/getcontentrequest';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../features/services/concretes/auth.service';
import { AppToastrService, ToastrMessageType } from '../../features/services/concretes/app-toastr.service';

@Component({
  selector: 'app-viewbootcamp',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './viewbootcamp.component.html',
  styleUrls: ['./viewbootcamp.component.scss']
})
export class ViewbootcampComponent implements OnInit {
  getbyIdBootcampResponse!: GetbyIdBootcampResponse;
  BootcampForm!: FormGroup;
  lessons: LessonItem[] | null = null;
  getcontent!: GetByContentResponse;
  LessoncontentForm!: FormGroup;
  error: any;
  videoUrl: SafeResourceUrl | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bootcampService: ViewBootcampService,
    private InstructorBootcampService: InstructorBootcamp,
    private formBuilder: FormBuilder,
    private lessonService: InstructorLessonService,
    private viewbootcampservice: ViewBootcampService,
    private sanitizer: DomSanitizer ,
    private autService: AuthService,
    private toastrService:AppToastrService,
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.initForm();
    if(this.autService.loggedIn())
    {
      this.getBootcamp();
      this.loadLesson();
    }else{
        this.toastrService.message("Bootcamp içeriklerine erşimek için  giriş yapmalısınız.", "Hata!", ToastrMessageType.Error);
        this.router.navigate(['/login']);
    }

  }

  initForm(): void {
    this.BootcampForm = this.formBuilder.group({
      id: [""],
      name: [""],
      description: [""],
      instructorId: [""],
      bootcampState: [true],
      bootcampImage: [""],
      BootcampImageFile: [null]
    });
    
    this.LessoncontentForm = this.formBuilder.group({
      text: [""],
      videoUrl: [""],
    });
  }


  getBootcamp(): void {
    const bootcampId = this.activatedRoute.snapshot.params['id'];
    console.log("bootcamp ıd:" + bootcampId)
    this.bootcampService.GetBootcamp(bootcampId).subscribe(
      (response: GetbyIdBootcampResponse) => {
        this.getbyIdBootcampResponse = response;
        this.BootcampForm.patchValue(response);
        console.log("gelen bootcamp ıd : " + response.id)
      },
      (error: any) => {
        console.error('Error fetching bootcamp:', error);
        console.log("Error retrieving bootcamp");
      }
    );
  }

  loadLesson(): void {
    const bootcampId = this.activatedRoute.snapshot.params['id'];
    const request: ListLessonRequest = { BootcampId: bootcampId, pageIndex: 0, pageSize: 10 };
    this.InstructorBootcampService.getBootcampById(bootcampId).subscribe(
      (bootcamp) => {
        this.lessonService.getLessonlist(request).subscribe(
          (response) => {
            if (response && response.items) {
              this.lessons = response.items.map((lesson) => {
                lesson.bootcampName = bootcamp.name;
                return lesson;
              });
              if (this.lessons.length > 0) {
                this.getLesson(this.lessons[0].id);
              }
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

  getLesson(lessonId: number): void {
    const request: GetByContentRequest = { LessonId: lessonId };
    this.viewbootcampservice.getlessoncontent(request).subscribe(
      (response: GetByContentResponse) => {
        this.LessoncontentForm.patchValue(response);
        this.updateVideoUrl(this.LessoncontentForm.get('videoUrl')?.value);
      },
      (error: any) => {
        console.error('Error fetching lesson content:', error);
      }
    );
  }

  updateVideoUrl(url: string): void {
    const embedUrl = url.replace('watch?v=', 'embed/');
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

}

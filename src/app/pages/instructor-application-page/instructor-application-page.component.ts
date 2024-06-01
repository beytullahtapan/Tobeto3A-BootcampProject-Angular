import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppToastrService, ToastrMessageType } from '../../features/services/concretes/app-toastr.service';
import { HasUnsavedChanges } from '../../core/guards/form/form-confirm-exit.guard';
import { CreateInstructorApplicationRequest } from '../../features/models/requests/instructor-application/create-instructor-application-request';
import { InstructorApplicationBaseService } from '../../features/services/abstracts/instructor-application-base.service';

@Component({
  selector: 'app-instructor-application-page',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './instructor-application-page.component.html',
  styleUrl: './instructor-application-page.component.scss'
})
export class InstructorApplicationPageComponent implements OnInit, HasUnsavedChanges {
  instructorApplicationForm!: FormGroup;

  constructor(
    private formBuilder:FormBuilder, 
    private router:Router, 
    private toastrService:AppToastrService, 
    private instructorApplicationBaseService:InstructorApplicationBaseService){}

  ngOnInit(): void {
    this.createApplicationForm();
  }


  createApplicationForm(){
    this.instructorApplicationForm=this.formBuilder.group({
      email:["",Validators.required],
      firstName:["",Validators.required],  
      lastName:["",Validators.required],  
      dateOfBirth:[""],
      nationalIdentity:[""],
      companyName:[""],
      additionalInformation:[""],
    })
  }

  apply(){
    if(this.instructorApplicationForm.valid){
      console.log(this.instructorApplicationForm.value);
      let instructorApplicationModel:CreateInstructorApplicationRequest = Object.assign({},this.instructorApplicationForm.value);
      instructorApplicationModel.isApproved = null;
      this.instructorApplicationBaseService.create(instructorApplicationModel).subscribe((response)=>{
        this.toastrService.message("Your application successfully sended.", "Success", ToastrMessageType.Success);
        this.instructorApplicationForm.markAsPristine();
        this.router.navigate(['/']);
      }, 
      (errorResponse: any) => { 
        this.toastrService.message(`An error occured during application process.`, "Error",ToastrMessageType.Error);
      })
    }
  }

  hasUnsavedChanges():boolean{
    return this.instructorApplicationForm.dirty;
  }
}

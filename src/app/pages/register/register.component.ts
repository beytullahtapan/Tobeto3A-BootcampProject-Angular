import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';
import { UserForRegisterRequest } from '../../features/models/requests/users/user-register-request';
import { CommonModule } from '@angular/common';
import { HasUnsavedChanges } from '../../core/guards/form/form-confirm-exit.guard';
import { Observable } from 'rxjs';
import { AppToastrService, ToastrMessageType } from '../../features/services/concretes/app-toastr.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, HasUnsavedChanges{
  registerForm!: FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router, private toastrService:AppToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm();
    if(this.authService.loggedIn()){
      alert("You are already logged in.");
      this.router.navigate(['/']);
    }
  }

  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      userName:["",Validators.required],
      firstName:["",Validators.required],  
      lastName:["",Validators.required],  
      dateOfBirth:[""],
      nationalIdentity:[""],
      confirmPassword:[""],
      about:[],
    },{ validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
  
    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ mismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }

  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      let registerModel:UserForRegisterRequest = Object.assign({},this.registerForm.value);
      registerModel.about = registerModel.nationalIdentity;
      this.authService.register(registerModel).subscribe((response)=>{
        this.toastrService.message("You successfully registered.", "Success", ToastrMessageType.Success);
        this.registerForm.markAsPristine();
        this.router.navigate(['/']);
      }, 
      (errorResponse: any) => { 
        this.toastrService.message(`An error occured during register process.`, "Error",ToastrMessageType.Error);
      })
    }
  }

  hasUnsavedChanges():boolean{
    return this.registerForm.dirty;
  }

}

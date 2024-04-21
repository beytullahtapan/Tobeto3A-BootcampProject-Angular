import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';
import { UserForRegisterRequest } from '../../features/models/requests/users/user-register-request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router) { }

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
      confirmPassword:[""]
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
      this.authService.register(registerModel).subscribe((response)=>{
        alert("Kayıt Başarılı")
        this.router.navigate(['/login']);
      }, 
      (errorResponse: any) => { 
        alert(`Error: ${errorResponse.errorMessage}`);
      })
    }
  }

  // register(){
  //   if(this.registerForm.valid){
  //     console.log(this.registerForm.value);
  //     let registerModel = Object.assign({},this.registerForm.value);
  //     this.authService.register(registerModel).subscribe((response)=>{
  //       alert("Kayıt Başarılı")
  //       this.router.navigate(['/login']);
  //     }, 
  //     (errorResponse: any) => { 
  //       errorResponse.error.Errors.forEach((error: any) => {
  //         console.error(`Property: ${error.Property}`);
  //         error.Errors.forEach((errorMessage: string) => {
  //           alert(`Error: ${errorMessage}`);
  //         });
  //       });
  //     })
  //   }
  // }

}

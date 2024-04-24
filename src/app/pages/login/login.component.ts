import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router, RouterModule} from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';
import { UserForLoginRequest } from '../../features/models/requests/users/user-login-request';
import { AppToastrService, ToastrMessageType } from '../../features/services/concretes/app-toastr.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router, private toastrService:AppToastrService){}

  ngOnInit(): void {
    this.createLoginForm();
    if(this.authService.loggedIn()){
      this.toastrService.message("You are already logged in. You are redirected to the home page.", "Success", ToastrMessageType.Info)
      this.router.navigate(['/']);
    }
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel:UserForLoginRequest = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.message("You successfully logged in.", "Success", ToastrMessageType.Success)
        this.router.navigate(['/'])
      },(error:any)=>{
        this.toastrService.message(`An error occured during login process.`, "Error",ToastrMessageType.Error);
      })
    }
  }

}

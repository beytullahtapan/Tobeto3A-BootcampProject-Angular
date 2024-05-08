import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../features/services/concretes/contact.service';
import { AppToastrService, ToastrMessageType } from '../../features/services/concretes/app-toastr.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting: boolean = false;
  submitError: string | null = null;
  isChecked: boolean = false;

  constructor(private fb: FormBuilder, private contactService: ContactService,private toastrService:AppToastrService) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });    
  }

  onToggleClick() {
     // Sayfanın yeniden yüklenmesini engelle
    this.isChecked = !this.isChecked; // Butonun durumunu değiştir
  }

  onSubmit() {
    if (!this.isChecked) { // Eğer toggle switch butonu işaretlenmemişse
      return; // Form gönderimini engelle
    }
    this.isSubmitting = true;
    this.submitError = null;

    const formData = this.contactForm.value;

    this.contactService.submitContactForm(formData)
      .subscribe(
        () => {
          this.isSubmitting = false;
          this.contactForm.reset();
          this.toastrService.message('Form submitted successfully!', 'Success', ToastrMessageType.Info);
          //alert('Form submitted successfully!');
        },
        (error) => {
          this.isSubmitting = false;
          this.submitError = error.message;
          this.toastrService.message('Form submission failed!', 'Error', ToastrMessageType.Info);
        }
      );
  }
}


import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss'
})
export class ProfileSettingsComponent {
  profileImage: any;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.profileImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }
  saveProfile(): void {
    // Implement save logic here
    console.log('Saving profile...');}
}

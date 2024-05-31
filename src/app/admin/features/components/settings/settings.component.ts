import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { initFlowbite } from 'flowbite';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GetbyidSettingsResponse } from '../../models/responses/settings/getbyid-settings-response';
import { SettingsService } from '../../services/concretes/settings.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateSettingsRequest } from '../../models/requests/settings/update-settings-request';
import { updateCloudrinaryRequest } from '../../models/requests/cloudinary/updatecloudrinaryrequest';
import { CloudiranyService } from '../../services/concretes/cloudinary.service';
import { updateCloudrinaryResponse } from '../../models/responses/cloudinary/updateCloudrinaryresponse';
import { UpdateSettingsImageRequest } from '../../models/requests/settings/update-image-request';
import { UpdateSettingsImageResponse } from '../../models/responses/settings/update-image-response';

@Component({
  selector: 'app-settings',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [EditorModule,CommonModule,HttpClientModule,ReactiveFormsModule,RouterModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  maintenanceMode!: boolean;
  getByIdSettingsResponse !: GetbyidSettingsResponse;
  SaveSettingsForm!: FormGroup;


  constructor(private router:Router, private activatedRoute: ActivatedRoute, private settingsService:SettingsService,private formBuilder:FormBuilder,private cloudiranyService:CloudiranyService) {}

  ngOnInit(): void {
    initFlowbite();
    this.getSettings();
    this.initForm();
  }
  initForm(): void {
    this.SaveSettingsForm = this.formBuilder.group({
      id: 1,
      title: [""],
      description: [""],
      keywords: [""],
      email: [""],
      phone: [""],
      googleSiteKey: [""],
      googleSecretKey: [""],
      googleAnalytics: [""],
      LogoFile: [null], 
      FaviconFile: [null], 
      logoUrl: [""],
      faviconUrl: [""],
      maintenanceMode: [false],
      termsOfUse: [""],
      privacyPolicy: [""],
      updatedDate: [""]
    });
  }
  

  getSettings(): void {
    this.settingsService.getSettingsById().subscribe(
      (response: GetbyidSettingsResponse) => {
        console.log("Settings retrieved successfully: ", response);
        this.getByIdSettingsResponse = response;
        this.SaveSettingsForm.patchValue(response);
      },
      (error: any) => {
        console.error('Error fetching settings:', error);
        console.log("Error retrieving settings");
      }
    );
  }
  onLogoFileChange(event: any) {
    const logofile = event.target.files[0];
    this.SaveSettingsForm.patchValue({
      LogoFile: logofile
    });
  }
  
  onFaviconFileChange(event: any) {
    const faviconfile = event.target.files[0];
    if (faviconfile) {
      this.SaveSettingsForm.patchValue({
        FaviconFile: faviconfile
      });
    }
  }
  SaveSettings(): void {
    if (this.SaveSettingsForm.valid) {
      let settingsModel: UpdateSettingsRequest = Object.assign({}, this.SaveSettingsForm.value);
      if (settingsModel.LogoFile) {
        this.updateLogo(settingsModel);
      } else if (settingsModel.FaviconFile) {
        this.updateFavicon(settingsModel);
      } else {
        // Ne logo ne de favicon seçilmediyse sadece ayarları güncelle
        this.updateSettings(settingsModel);
      }
    } else {
      console.log("Form is invalid.");
    }
  }
  
  updateLogo(settingsModel: UpdateSettingsRequest): void {
    const logoformdata = new FormData();
    logoformdata.append("formFile", settingsModel.LogoFile);
  
    if (settingsModel.logoUrl) {
      let deletelogoModel: UpdateSettingsImageRequest = {
        Url: settingsModel.logoUrl 
      };
      this.settingsService.deleteimage(deletelogoModel).subscribe(() => {
        this.cloudiranyService.updateCloudrinary(logoformdata).subscribe((response: updateCloudrinaryResponse) => {
          settingsModel.logoUrl = response.url; 
          this.updateFavicon(settingsModel);
        });
      });
    } else {
      this.cloudiranyService.updateCloudrinary(logoformdata).subscribe((response: updateCloudrinaryResponse) => {
        settingsModel.logoUrl = response.url; 
        this.updateFavicon(settingsModel);
      });
    }
  }
  
  updateFavicon(settingsModel: UpdateSettingsRequest): void {
    const favicondata = new FormData();
    favicondata.append("formFile", settingsModel.FaviconFile);
  
    if (settingsModel.faviconUrl) {
      let deletefaviconModel: UpdateSettingsImageRequest = {
        Url: settingsModel.faviconUrl 
      };
      this.settingsService.deleteimage(deletefaviconModel).subscribe(() => {
        this.cloudiranyService.updateCloudrinary(favicondata).subscribe((response: updateCloudrinaryResponse) => {
          settingsModel.faviconUrl = response.url;
          this.updateSettings(settingsModel);
        });
      });
    } else {
      this.cloudiranyService.updateCloudrinary(favicondata).subscribe((response: updateCloudrinaryResponse) => {
        settingsModel.faviconUrl = response.url;
        this.updateSettings(settingsModel);
      });
    }
  }
  
  updateSettings(settingsModel: UpdateSettingsRequest): void {
    this.settingsService.updateSettings(settingsModel).subscribe(
      (response) => {
        console.log("Settings updated successfully: ", response);
      },
      (error) => {
        console.error('Error updating settings:', error);
      }
    );
  }
  
 
}

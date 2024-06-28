import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // CommonModule eklenmeli
import { initFlowbite } from 'flowbite';
import { SharedModule } from './shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService } from './admin/features/services/concretes/settings.service';
import { GetbyidSettingsResponse } from './admin/features/models/responses/settings/getbyid-settings-response';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './features/services/concretes/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  getByIdSettingsResponse !: GetbyidSettingsResponse;
  SaveSettingsForm!: FormGroup;
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
  title = 'Bootcamp Project';
  ShowVisibility = true;
  maintenance = true;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private settingsService:SettingsService,private formBuilder:FormBuilder
    ,private authService:AuthService
  ) {
   
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.updateVisibility());

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.updateMaintance());
  }

  ngOnInit(): void {
    initFlowbite();
    const currentPath = this.router.url;
    if (currentPath.includes('/login')) {
      return;
    }else{
      this.CheckMaintenance();
    }
    
  }

  updateVisibility() {
    const path = this.router.url; 

    this.ShowVisibility = !['/login', '/register', '/maintenance', '/inst-application'].includes(path) && !path.startsWith('/admin') && !path.startsWith('/instructor'); 
  }

  updateMaintance(){
    const path = this.router.url; 
    this.maintenance = !['/login'].includes(path) && !path.startsWith('/admin'); 

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

  CheckMaintenance(): void {
    const isLoggedIn = this.authService.loggedIn(); // varsayılan olarak kullanıcı giriş yapmış olarak kabul edildi

    if (isLoggedIn && this.authService.isAdmin()) { // Eğer kullanıcı giriş yapmışsa ve adminse
      return; // Bakım modu kontrolü atla
    }
    this.settingsService.getSettingsById().subscribe(
      (response: GetbyidSettingsResponse) => {
        if (response.maintenanceMode && this.maintenance) {
          this.router.navigate(['/maintenance']); 
        }
      },
      (error: any) => {
        console.error('Error fetching settings:', error);
        console.log("Error retrieving settings");
      }
    );
  }
  

  
}
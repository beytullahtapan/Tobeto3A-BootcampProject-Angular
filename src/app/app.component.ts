import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // CommonModule eklenmeli
import { initFlowbite } from 'flowbite';
import { SharedModule } from './shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule,ProfileComponent,HttpClientModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Bootcamp Project';
  showNavbar = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Rota değişikliklerini dinle
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.updateNavbarVisibility());
  }

  ngOnInit(): void {
    initFlowbite(); // Flowbite'ı başlat
  }

  updateNavbarVisibility() {
    const path = this.router.url; // Aktif URL'yi al
    this.showNavbar = !['/login', '/register'].includes(path) && !path.startsWith('/admin'); // Navbar'ın görünürlüğünü kontrol et
  }
  
}

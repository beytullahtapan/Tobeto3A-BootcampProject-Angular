import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // CommonModule eklenmeli
import { initFlowbite } from 'flowbite';
import { SharedModule } from './shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Bootcamp Project';
  showNavbar = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
   
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.updateNavbarVisibility());
  }

  ngOnInit(): void {
    initFlowbite(); 
  }

  updateNavbarVisibility() {
    const path = this.router.url; 
    this.showNavbar = !['/login', '/register'].includes(path) && !path.startsWith('/admin'); 
  }
  
}
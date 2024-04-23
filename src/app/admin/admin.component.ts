import { Component } from '@angular/core';
import { AdminNavbarComponent } from './components/navbar/navbar.component';
import { AdminSidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminNavbarComponent,
    AdminSidebarComponent,
    RouterOutlet
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}

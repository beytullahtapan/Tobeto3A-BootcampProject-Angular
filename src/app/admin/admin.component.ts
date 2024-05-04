import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from './shared/components/navbar/navbar.component';
import { AdminSidebarComponent } from './shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AdminSharedModule } from './shared/adminshared.module';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,AdminSharedModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  
}

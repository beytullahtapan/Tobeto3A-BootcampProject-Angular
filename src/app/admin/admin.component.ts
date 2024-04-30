import { Component } from '@angular/core';
import { AdminNavbarComponent } from './shared/components/navbar/navbar.component';
import { AdminSidebarComponent } from './shared/components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/adminshared.module';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,SharedModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}

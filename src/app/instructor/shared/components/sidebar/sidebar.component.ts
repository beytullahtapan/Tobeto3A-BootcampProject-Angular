import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'instructorapp-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule,FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class InstructorSidebarComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}

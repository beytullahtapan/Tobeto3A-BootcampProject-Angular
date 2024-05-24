import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, EditorModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class InstructorContentComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}

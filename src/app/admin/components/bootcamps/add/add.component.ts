import { Component, OnInit } from '@angular/core';
import { initFlowbite, } from 'flowbite';



@Component({
  selector: 'app-add',
  standalone: true,
  imports: [],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
    
  }
}

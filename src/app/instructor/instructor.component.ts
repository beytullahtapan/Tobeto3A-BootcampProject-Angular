import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InstructorSharedModule } from './shared/instructorshared.module';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [RouterOutlet,InstructorSharedModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.scss'
})
export class InstructorComponent {

}

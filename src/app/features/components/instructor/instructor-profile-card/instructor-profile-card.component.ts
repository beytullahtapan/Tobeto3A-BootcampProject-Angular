import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetbyidInstructorResponse } from '../../../models/responses/instructor/getbyid-instructor-response';

@Component({
  selector: 'app-instructor-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './instructor-profile-card.component.html',
  styleUrl: './instructor-profile-card.component.scss'
})
export class InstructorProfileCardComponent {
  @Input() instructorData!: GetbyidInstructorResponse;
  @Output() sendMessage: EventEmitter<void> = new EventEmitter<void>();

  // initialize sending message
  initiateSendMessage() {
    this.sendMessage.emit();
  }
}



import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BootcampItem } from '../../../models/responses/bootcamp/get-bootcamps-response';
import { GetBootcampsListResponse } from '../../../models/responses/bootcamp/get-bootcamps-list-response';
import { RouterModule } from '@angular/router';
import { BootcampListService } from '../../../services/concretes/bootcamplist.service';

@Component({
  selector: 'app-bootcamp-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bootcamp-card.component.html',
  styleUrl: './bootcamp-card.component.scss'
})
export class BootcampCardComponent {
  constructor(
    private bootcampListService: BootcampListService,
  ) { }
  
  @Input() bootcampCardData!: GetBootcampsListResponse;
  
  applyToBootcamp(bootcampId: number): void {
    this.bootcampListService.applyToBootcamp(bootcampId);
  }
}


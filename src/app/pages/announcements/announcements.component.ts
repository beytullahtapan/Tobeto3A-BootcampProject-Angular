import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetListAnnouncementResponse } from '../../features/models/responses/announcement/get-list-announcement-response';
import { AnnouncementBaseService } from '../../features/services/abstracts/announcement-base.service';
import { AnnouncementListDto } from '../../features/models/responses/announcement/announcement-list-dto';
import { AnnouncementService } from '../../features/services/concretes/announcement.service';

@Component({
  selector: 'app-announcements',
  standalone: true,
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss',
  imports: [CommonModule]
})
export class AnnouncementsComponent implements OnInit {
  announcements: AnnouncementListDto | undefined;
  currentPageNumber!: number;
    
  constructor(private announcementService: AnnouncementService) { }
  readonly PAGE_SIZE = 6;
  ngOnInit(): void {
    this.getAnnouncements();
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements({ page: 0, pageSize: this.PAGE_SIZE })
      .subscribe(announcements => this.announcements = announcements);
  }
 
  
}




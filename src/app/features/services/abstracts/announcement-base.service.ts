import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest } from '../../../core/models/page-request';
import { AnnouncementListDto } from '../../models/responses/announcement/announcement-list-dto';

@Injectable()
export abstract class AnnouncementBaseService {
 abstract getAnnouncements(pageRequest:PageRequest): Observable<AnnouncementListDto[]>
}

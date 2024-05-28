import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { GetByIdAnnouncementResponse } from '../../models/responses/announcement/get-by-id-announcement-response';
import { AnnouncementListDto } from '../../models/responses/announcement/announcement-list-dto';
import { PageRequest } from '../../../core/models/page-request';


@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private readonly apiUrl: string = `${environment.API_URL}/Announcements`;

  constructor(private httpClient: HttpClient) {}

  getAnnouncements(pageRequest:PageRequest): Observable<AnnouncementListDto> {
    return this.httpClient.get<AnnouncementListDto>(`${this.apiUrl}?PageIndex=${pageRequest.page}&PageSize=${pageRequest.pageSize}`);
  }
}
//http://localhost:60805/api/Announcements?PageIndex=0&PageSize=10
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { SettingsBaseService } from '../abstracts/settings-base.service';
import { GetbyidSettingsResponse } from '../../models/responses/settings/getbyid-settings-response';
import { UpdateSettingsResponse } from '../../models/responses/settings/update-settings-response';
import { UpdateApplicantRequest } from '../../../../features/models/requests/applicant/update-applicant-request';
import { TokenModel } from '../../../../features/models/responses/users/token-model';
import { UpdateEmployeeResponse } from '../../../../features/models/responses/employee/update-employee-response';
import { UpdateSettingsRequest } from '../../models/requests/settings/update-settings-request';
import { UpdateSettingsImageRequest } from '../../models/requests/settings/update-image-request';
import { UpdateSettingsImageResponse } from '../../models/responses/settings/update-image-response';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends SettingsBaseService {

  private readonly apiUrl: string = `${environment.API_URL}/Settings`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  override getSettingsById(): Observable<GetbyidSettingsResponse> {
    return this.httpClient.get<GetbyidSettingsResponse>(`${this.apiUrl}/1`).pipe(
      map((response) => {
        const newResponse: GetbyidSettingsResponse = {
          id: response.id,
          title: response.title,
          description: response.description,
          keywords: response.keywords,
          email: response.email,
          phone: response.phone,
          googleSiteKey: response.googleSiteKey,
          googleSecretKey: response.googleSecretKey,
          googleAnalytics: response.googleAnalytics,
          logoUrl: response.logoUrl,
          faviconUrl: response.faviconUrl,
          maintenanceMode: response.maintenanceMode,
          termsOfUse: response.termsOfUse,
          privacyPolicy: response.privacyPolicy,
        };
        return newResponse;
      })
    );
  }

  updateSettings(updateSettingsRequest: UpdateSettingsRequest): Observable<UpdateSettingsResponse> {
    return this.httpClient.put<UpdateSettingsResponse>(`${this.apiUrl}`, updateSettingsRequest).pipe(
      map(response => {
        return response;
      }),
      catchError(responseError => {
        throw responseError;
      })
    );
  }
  
  override deleteimage(updateSettingsImageRequest: UpdateSettingsImageRequest): Observable<UpdateSettingsImageResponse> {
    return this.httpClient.post<UpdateSettingsImageResponse>(`${this.apiUrl}/DeleteImage`, updateSettingsImageRequest).pipe(
      map(response => response),
      catchError(responseError => {
        throw responseError;
      })
    );
  }

}

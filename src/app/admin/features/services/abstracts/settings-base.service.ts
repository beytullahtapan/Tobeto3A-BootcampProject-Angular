import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetbyidSettingsResponse } from '../../models/responses/settings/getbyid-settings-response';
import { UpdateSettingsRequest } from '../../models/requests/settings/update-settings-request';
import { UpdateSettingsResponse } from '../../models/responses/settings/update-settings-response';
import { UpdateSettingsImageRequest } from '../../models/requests/settings/update-image-request';
import { UpdateSettingsImageResponse } from '../../models/responses/settings/update-image-response';

@Injectable()
export abstract class SettingsBaseService {

  abstract getSettingsById(): Observable<GetbyidSettingsResponse>;
  abstract updateSettings(updateSettingsRequest: UpdateSettingsRequest): Observable<UpdateSettingsResponse>; 
  abstract deleteimage(updateSettingsImageRequest: UpdateSettingsImageRequest): Observable<UpdateSettingsImageResponse>;
}

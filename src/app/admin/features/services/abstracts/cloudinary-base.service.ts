import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { updateCloudrinaryRequest } from '../../models/requests/cloudinary/updatecloudrinaryrequest';
import { updateCloudrinaryResponse } from '../../models/responses/cloudinary/updateCloudrinaryresponse';

@Injectable()
export abstract class CloudiranyBaseService {

  abstract updateCloudrinary(FormData: FormData): Observable<updateCloudrinaryResponse>;
}

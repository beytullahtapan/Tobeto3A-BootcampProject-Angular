import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CloudiranyBaseService } from '../abstracts/cloudinary-base.service';
import { updateCloudrinaryResponse } from '../../models/responses/cloudinary/updateCloudrinaryresponse';


@Injectable({
  providedIn: 'root'
})
export class CloudiranyService extends CloudiranyBaseService {

  private readonly apiUrl: string = `${environment.API_URL}`;

  constructor(private httpClient: HttpClient) {
    super();
  }



  updateCloudrinary(FormData: FormData): Observable<updateCloudrinaryResponse> {
    return this.httpClient.put<updateCloudrinaryResponse>(`${this.apiUrl}/Settings/1`, FormData).pipe(
      map(response => {
        console.log("Başarılı bir şekilde yüklendi", response);
        return response;
      }),
      catchError(responseError => {
        throw responseError;
      })
    );
  }

  addbootcampimage(FormData: FormData): Observable<updateCloudrinaryResponse> {
    return this.httpClient.post<updateCloudrinaryResponse>(`${this.apiUrl}/Bootcamps/Image`, FormData).pipe(
      map(response => {
        console.log("Başarılı bir şekilde yüklendi", response);
        return response;
      }),
      catchError(responseError => {
        throw responseError;
      })
    );
  }




}

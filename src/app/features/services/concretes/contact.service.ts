import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
  export class ContactService {
    constructor(private http: HttpClient) {}
  
    submitContactForm(formData: any) {
      return this.http.post('http://localhost:60805/api/Contacts', formData);
    }
  }




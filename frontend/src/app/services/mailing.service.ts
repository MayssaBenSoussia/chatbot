import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MailingService {

  
  constructor(private http: HttpClient) {}

  sendEmail(message: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUri}/send-email`,{user_message:message})

  }

}

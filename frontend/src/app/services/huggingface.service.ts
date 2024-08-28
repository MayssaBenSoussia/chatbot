import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HuggingFaceService {
  private apiUrl = environment.huggingFaceAPi
  private apiToken = environment.huggingFaceToken
  constructor(private http: HttpClient) {}

  getCompletion(prompt: string): Observable<any> {

    const payload = {
      inputs: prompt,
    //   parameters: {
    //     max_length: 50,
    //     num_return_sequences: 1
    //   }
    };

    return this.http.post<any>(this.apiUrl, payload, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json'
      })
    })
  }
}
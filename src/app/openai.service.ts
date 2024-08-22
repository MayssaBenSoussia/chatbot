import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { OpenAIResponse } from './utility/constants';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  api_url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  QueryPrompt(prompt: string): Observable<OpenAIResponse>{
    let ip = localStorage.getItem("ip")
    return this.http.post<any>(`${this.api_url}/queryAssistant`, {prompt, address: ip}).pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
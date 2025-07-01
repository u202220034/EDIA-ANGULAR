import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IaApiService {

  constructor(private http: HttpClient) { }

  sendToAI(prompt: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer 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',
    'Content-Type': 'application/json'
  });

  const body = {
    inputs: prompt,
    parameters: { max_new_tokens: 100 }
  };

  const url = 'https://api-inference.huggingface.co/models/google/flan-t5-small';

  return this.http.post(url, body, { headers });
}
}

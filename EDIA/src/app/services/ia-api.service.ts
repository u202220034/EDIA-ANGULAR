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
    'Content-Type': 'application/json',
  });

  const body = {
      model: 'deepseek/deepseek-r1:free',
      messages: [
        { role: 'system', content: 'Eres un asistente experto en programación y aprendizaje técnico.' },
        { role: 'user', content: prompt }
      ]
    };

  return this.http.post('https://openrouter.ai/api/v1/chat/completions', body, { headers });
}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsAPIService {
  private apiKey = 'b42e4eabad0141589ca8506c2a7d1d52';
  private baseUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) {}

  getTechNewsInSpanish(): Observable<any> {
    const url = `${this.baseUrl}/everything?q=programación AND tecnología&language=es&pageSize=3&sortBy=publishedAt&apiKey=${this.apiKey}`;
  return this.http.get(url);
  }


  getTopHeadlines(country: string = 'us', category: string = 'general') {
    const url = `${this.baseUrl}/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getByCategory(category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/top-headlines?category=${category}&country=us&apiKey=${this.apiKey}`);
  }
}

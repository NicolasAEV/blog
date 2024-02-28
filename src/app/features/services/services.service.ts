import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article.interfaces'
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'https://api.spaceflightnewsapi.net/v4/articles';
 
  constructor(private http: HttpClient) {}
  
  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
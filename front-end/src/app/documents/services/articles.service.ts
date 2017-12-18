import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { ArticleList } from '../model/article-list'

const baseUrl = "http://localhost:3000/api/articles";

@Injectable()
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(baseUrl).map(res => {
      return new ArticleList(res);
    });
  }

}

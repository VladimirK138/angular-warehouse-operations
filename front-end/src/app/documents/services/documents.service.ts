import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { DocumentList } from '../model/document-list';
import { Document } from '../model/document';
import { ItemList } from '../model/item-list';
import { Item } from '../model/item';

const baseUrl = "http://localhost:3000/api/documents";

@Injectable()
export class DocumentsService {
  constructor(private http: HttpClient) {}

  getAll(params?: any) {
    let queryParams = {};

    if(params) {
      queryParams = {
        params: new HttpParams()
          .set("pageSize", params.pageSize && params.pageSize.toString() || '1')
          .set("page", params.page && params.page.toString() || '5')
          .set("sort", params.sort && params.sort.toString() || '')
          .set("sortDirection", params.sortDirection && params.sortDirection.toString() || '')
      }
    }

    return this.http.get(baseUrl, queryParams).map(res => {
      return new DocumentList(res);
    });
  }

  get(id: number) {
    return this.http.get(baseUrl + "/" + id).map(res => {
      return new Document(res);
    });
  }

  recordDocument(document: Document) {
    return this.http.put(baseUrl + "/" + document._id, document).map(res => {
      return new Document(res);
    })
  }

  getItems(id: number) {
   return this.http.get(baseUrl + "/" + id + "/items").map(res => {
      return new ItemList(res);
    }); 
  }

  saveItem(item: Item) {
    return this.http.post(baseUrl + "/" + item.documents + "/items", item).map(res => {
      return new Item(res);
    });
  }

}

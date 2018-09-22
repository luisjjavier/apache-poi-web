import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private routePrefix = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  getDocument(documentRequest: { filename: string, paragraph: string }) {
    return this.httpClient.post(`${this.routePrefix}/documents`, documentRequest, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}

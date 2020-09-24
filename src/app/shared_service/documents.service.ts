import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import { Subject} from 'rxjs';
import {Documents} from '../classes/documents';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private baseUrl = 'http://localhost:8080/api/documents';
  private headers = new Headers ({'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});
  private documents: Documents;
  private RegenerateData = new Subject<void>();
  RegenerateData$ = this.RegenerateData.asObservable();
  constructor(private _http: Http) {}

  getDocuments(): Promise<Documents[]> {
    const url = `${this.baseUrl}/all`;
    return this._http.get(url)
        .toPromise()
        .then(response =>
            response.json() as Documents[])
        .catch(this.handleError);
}
  getDocument(id: Number): Promise<Documents> {
    const url = `${this.baseUrl}/${id}`;
    return this._http.get(url)
        .toPromise()
        .then(response =>
            response.json() as Documents)
        .catch(this.handleError);
}
  deleteDocument(documents: Documents): Promise<{Documents}> {
    const url = `${this.baseUrl}/${documents.id}`;
    return this._http
        .delete(url)
        .toPromise()
        .catch(this.handleError);
}
  addDocument(documents: Documents): Promise<Documents> {
    return this._http
        .post(this.baseUrl, JSON.stringify(documents), { headers: this.headers })
        .toPromise()
        .then(res => res.json() as Documents)
        .catch(this.handleError);
}
  editDocument(documents: Documents): Promise<Documents> {
    return this._http
        .put(this.baseUrl, JSON.stringify(documents), { headers: this.headers })
        .toPromise()
        .then(res => res.json() as Documents)
        .catch(this.handleError);
}

  announceChange() {
    this.RegenerateData.next();
}
  setter(documents: Documents){
      this.documents = documents;
    }
  getter(){
  return this.documents;
  }
  handleError(error: any): Promise<any> {
    console.error("Error... ", error);
    return Promise.reject(error.message || error);
}
}

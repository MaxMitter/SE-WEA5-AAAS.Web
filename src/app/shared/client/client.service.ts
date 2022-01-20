import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of} from "rxjs";
import {ClientInstance} from "./client-instance";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  basePath: string = environment.server + '/Management/ClientInstance';
  header: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders().set('AppKey', environment.appKey);
  }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  getAllByAppKey(): Observable<Array<ClientInstance>> {
    return this.http.get<any>(`${this.basePath}`, {'headers': this.header})
      .pipe(map(res => res),
        catchError(this.errorHandler));
  }

  createNewClient(): Observable<string> {
    return this.http.post<any>(`${this.basePath}`, {
      'identifier': 'NewClient',
      'appKey': environment.appKey
    }, {'headers': this.header}).pipe(catchError(this.errorHandler));
  }

  updateClient(id: string, identifier: string): Observable<any> {
    return this.http.put<ClientInstance>(`${this.basePath}/${id}`, {
      'Identifier': identifier,
      'AppKey': environment.appKey
    }, {'headers': this.header}).pipe(catchError(this.errorHandler));
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete<any>(`${this.basePath}/${id}`, {'headers': this.header}).pipe(catchError(this.errorHandler));
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, of} from "rxjs";
import {ClientInstance} from "./client-instance";
import {catchError, filter, map} from "rxjs/operators";
import {query} from "@angular/animations";

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
}

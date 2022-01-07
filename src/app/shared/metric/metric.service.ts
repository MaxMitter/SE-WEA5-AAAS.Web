import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Metric} from "./metric";
import {Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  metrics: Metric[] = [];

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  getAll(): Observable<Array<Metric>> {
    return this.http.get<any>(`${environment.server}/Metric`)
      .pipe(map(res => res['metrics']), catchError(this.errorHandler));
  }
}

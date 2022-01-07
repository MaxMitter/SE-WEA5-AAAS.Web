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

  basePath: string = environment.server + '/Management';
  metrics: Metric[] = [];

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  getAll(): Observable<Array<Metric>> {
    return this.http.get<any>(`${this.basePath}/Metric`)
      .pipe(map(res => res['metrics']), catchError(this.errorHandler));
  }

  getAllByClientInstanceId(clientInstanceId: string) : Observable<Array<Metric>> {
    return this.http.get<any>(`${this.basePath}/Metric?clientInstanceId=${clientInstanceId}`)
      .pipe(map(res => res), catchError(this.errorHandler));
  }
}

import { Injectable } from '@angular/core';
import {Detector} from "./detector";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { environment } from 'src/environments/environment';
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DetectorService {

  detectors: Detector[] = [];
  basePath: string = environment.server + '/Management/Detector';
  header: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders().set('AppKey', environment.appKey);
  }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  getAllByClientInstance(clientInstanceId: string) : Observable<Array<Detector>> {
    return this.http.get<any>(`${this.basePath}?clientInstanceId=${clientInstanceId}`, {'headers': this.header})
      .pipe(map(res => res), catchError(this.errorHandler));
  }

  getByClientInstanceAndMeasurementName(clientInstanceId: string, measurementName: string) : Observable<Detector> {
    return this.http.get<any>(`${this.basePath}?clientInstanceId=${clientInstanceId}&measurementName=${measurementName}`,
      {'headers': this.header}).pipe(map(res => res[0]), catchError(this.errorHandler));
  }

  getById(id: string) : Observable<Detector> {
    return this.http.get<any>(`${this.basePath}/${id}`, {'headers': this.header})
      .pipe(map(res => res), catchError(this.errorHandler));
  }

  save(detector: Detector) : Observable<any> {
    return this.http.post<any>(`${this.basePath}`, detector, {'headers': this.header})
      .pipe(map(res => res), catchError(this.errorHandler));
  }

  update(detector: Detector) : Observable<boolean> {
    return this.http.put<any>(`${this.basePath}/${detector.id}`, detector, {'headers': this.header})
      .pipe(map(res => res), catchError(this.errorHandler));
  }

  delete(detectorId: string): Observable<boolean> {
    return this.http.delete<any>(`${this.basePath}/${detectorId}`, {'headers': this.header})
      .pipe(map(res => res), catchError(this.errorHandler));
  }
}

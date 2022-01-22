import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {LogMessage} from "./log-message";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LogMessageService {

  basePath: string = environment.server + '/Management';
  logMessages: LogMessage[] = [];

  constructor(private http: HttpClient) {
  }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  getAll(): Observable<Array<LogMessage>> {
    return this.http.get<any>(`${this.basePath}/MeasurementLog`)
      .pipe(map(res => res), catchError(this.errorHandler));
  }

  getAllByClientInstanceId(clientInstanceId: string): Observable<Array<LogMessage>> {
    return this.http.get<any>(`${this.basePath}/MeasurementLog?clientInstanceId=${clientInstanceId}`)
      .pipe(map(res => {
        let returnList: LogMessage[] = [];
        for (let log of res) {
          returnList.push(new LogMessage(
            log.id,
            log.measurementName,
            log.clientInstanceId,
            log.createdAt,
            log.message,
            log.type
          ));
        }
        return returnList;
      }), catchError(this.errorHandler));
  }
}

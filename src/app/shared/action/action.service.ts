import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import { Action } from './action';
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  basePath: string = environment.server + '/Management/DetectorAction';
  header: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders().set('AppKey', environment.appKey);
  }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  getAllByClientInstanceId(clientInstanceId: string): Observable<Array<Action>> {
    return this.http.get<any>(`${this.basePath}`, {'headers': this.header})
      .pipe(map((res: Array<Action>) => {
          let list = [];
          for (let action of res) {
            if(action.clientInstanceId === clientInstanceId)
              list.push(action);
          }
          return list;
        }),
        catchError(this.errorHandler));
  }

  updateAction(action: Action): Observable<boolean> {
    return this.http.put<any>(`${this.basePath}/${action.id}`, action, {'headers': this.header});
  }

  deleteAction(actionId: string): Observable<boolean> {
    return this.http.delete<any>(`${this.basePath}/${actionId}`, {'headers': this.header});
  }
}

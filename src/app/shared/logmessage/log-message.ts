import {TicksToDatePipe} from "../../pipes/tickstodatepipe";

export class LogMessage {
  constructor(
    public id?: string,
    public measurementName?: string,
    public clientInstanceId?: string,
    public createdAt?: number,
    public message?: string,
    public logType?: LogType,
    public createdAtDate?: string
  ) {
    this.createdAtDate = new TicksToDatePipe().transform(createdAt ?? 0)
  }
}

export enum LogType {
  Trace = 'Trace',
  Warning = 'Warning',
  Error = 'Error'
}

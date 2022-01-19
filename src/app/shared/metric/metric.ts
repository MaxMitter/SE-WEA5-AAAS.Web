import {TicksToDatePipe} from "../../pipes/tickstodatepipe";
import {TicksToTimespanPipe} from "../../pipes/ticksToTimespanPipe";

export class Metric {
  constructor(
    public id?: string,
    public clientInstanceId?: string,
    public measurementName?: string,
    public createdAt?: number,
    public measurement?: number,
    public counter?: number,
    public endedAt?: number,
    public createdAtDate?: string,
    public endedAtDate?: string,
    public timespan?: string
  ) {
    let pipe = new TicksToDatePipe();
    this.createdAtDate = pipe.transform(createdAt ?? 0);
    this.endedAtDate = pipe.transform(endedAt ?? 0);
    let timeDiff = (endedAt ?? 0) - (createdAt ?? 0);
    let timespanObj = new TicksToTimespanPipe().transform(timeDiff);
    this.timespan = `${timespanObj.hours}:${timespanObj.mins}:${timespanObj.secs}.${timespanObj.ms}`;
  }
}

import {TicksToDatePipe} from "../../pipes/tickstodatepipe";

export class Metric {
  constructor(
    public id?: string,
    public clientInstanceId?: string,
    public measurementName?: string,
    public createdAt?: number,
    public measurement?: number,
    public counter?: number,
    public endedAt?: number,
    public createdAtDate?: string
  ) {
    this.createdAtDate = new TicksToDatePipe().transform(createdAt ?? 0);
  }

}

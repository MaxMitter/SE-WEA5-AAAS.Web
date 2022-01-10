export class Metric {
  constructor(
    public id?: string,
    public clientInstanceId?: string,
    public measurementName?: string,
    public createdAt?: number,
    public createAtDate?: Date,
    public measurement?: number,
    public counter?: number,
    public endedAt?: number
  ) { }
}

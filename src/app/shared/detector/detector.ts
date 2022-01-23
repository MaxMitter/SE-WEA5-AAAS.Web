export class Detector {
  constructor(
    public id?: string,
    public clientInstanceId?: string,
    public measurementName?: string,
    public name?: string,
    public minValue?: number,
    public maxValue?: number,
    public detectorInterval?: bigint,
    public fromTime?: number,
    public toTime?: number,
    public lastMeasures?: number,
    public listOperation?: ListOperation,
    public maxOutliers?: number,
    public detectorActionId?: string,
    public isActive?: boolean
  ) {
  }

  // public isNew: boolean = false;
}

export enum ListOperation {
  NoOperation = 'NoOperation',
  Heartbeat = 'Heartbeat',
  Avg = 'Avg'
}

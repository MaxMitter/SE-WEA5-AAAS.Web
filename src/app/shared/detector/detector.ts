export class Detector {
  constructor(
    public id?: string,
    public clientInstanceId?: string,
    public measurementName?: string,
    public name?: string,
    public minValue?: number,
    public maxValue?: number,
    public detectorInterval?: bigint,
    public fromTime?: bigint,
    public toTime?: bigint,
    public lastMeasures?: number,
    public listOperation?: string,
    public maxOutliers?: number,
    public detectorActionId?: string,
    public isActive?: boolean
  ) {
  }
}

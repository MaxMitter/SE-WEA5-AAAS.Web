import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'TicksToTimespanPipe'
})

export class TicksToTimespanPipe implements PipeTransform {
  transform(value: number | undefined): TimespanContainer {
    if (value !== undefined) {
      let time = value;
      let hours = Math.floor((time / (60 * 60 * 10e6)) % 24);
      time -= hours * 60 * 60 * 10e6;
      let mins = Math.floor((time / (60 * 10e6)) % 60);
      time -= mins * 60 * 10e6;
      let sec = Math.floor((time / 10e6) % 60);
      time -= sec * 10e6;
      let ms = Math.floor(time / 10e6);

      return new TimespanContainer(hours, mins, sec, ms);
    } else return new TimespanContainer(0, 0, 0, 0);
  }
}

export class TimespanContainer {
  public hours: number;
  public mins: number;
  public secs: number;
  public ms: number;

  constructor(hours: number, mins: number, secs: number, ms: number) {
    this.hours = hours;
    this.mins = mins;
    this.secs = secs;
    this.ms = ms;
  }
}

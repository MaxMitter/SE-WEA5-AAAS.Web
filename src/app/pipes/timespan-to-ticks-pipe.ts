import {Pipe, PipeTransform} from "@angular/core";
import {TimespanContainer} from "./ticksToTimespanPipe";

@Pipe({
  name: 'TimespanToTicksPipe'
})

export class TimespanToTicksPipe implements PipeTransform{
  transform(value: TimespanContainer): number {
    let ticks = 0;
    ticks += value.ms * 10e3;
    ticks += value.secs * 10e6;
    ticks += value.mins * 10e6 * 60;
    ticks += value.hours * 10e6 * 60 * 60;
    return ticks;
  }
}

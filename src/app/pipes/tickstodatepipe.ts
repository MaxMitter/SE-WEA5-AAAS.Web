import {Pipe, PipeTransform} from "@angular/core";
import {formatDate} from "@angular/common";

@Pipe({
  name: 'TicksToDatePipe'
})

export class TicksToDatePipe implements PipeTransform{
  transform(value: number): string {
    //https://stackoverflow.com/questions/15486299/convert-c-sharp-net-datetime-ticks-to-days-hours-mins-in-javascript
    var time = value; // Time value in ticks
    var days = Math.round(time/(24*60*60*10000000)); // Math.floor() rounds a number downwards to the nearest whole integer, which in this case is the value representing the day
    var hours = Math.floor((time/(60*60*10000000)) % 24); // Math.round() rounds the number up or down
    var mins = Math.floor((time/(60*10000000)) % 60);
    var sec = Math.floor((time/10000000) % 60);

    var date: Date = new Date("0001-01-01T00:00:00");
    date.setDate(days);
    date.setHours(hours);
    date.setMinutes(mins);
    date.setSeconds(sec);

    return formatDate(date, "dd.MM.YYYY HH:mm:ss", "en-US");
  }
}
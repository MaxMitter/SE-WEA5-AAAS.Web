import { Component, OnInit } from '@angular/core';
import {ClientInstance} from "../../shared/client/client-instance";
import {Subject} from "rxjs";
import {LogMessageService} from "../../shared/logmessage/log-message.service";
import {LogMessage} from "../../shared/logmessage/log-message";

@Component({
  selector: 'app-logmessage',
  templateUrl: './logmessage.component.html',
  styleUrls: ['./logmessage.component.css']
})
export class LogmessageComponent implements OnInit {

  currentClientInstance: ClientInstance | null = null;
  logList: LogMessage[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private logService: LogMessageService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      processing: true,
      language: {
        processing: '<fa-icon icon="spinner" spin></fa-icon>'
      },
      data: this.logList,
      columns: [{
        title: 'Measurement Name',
        data: 'measurementName'
      }, {
        title: 'Created At',
        data: 'createdAtDate'
      }, {
        title: 'Type',
        data: 'logType'
      }, {
        title: 'Message',
        data: 'message'
      }],
      destroy: true
    };

    this.reloadData();
  }

  onClientChanged(client: ClientInstance | null): void {
    this.currentClientInstance = client;
    this.reloadData();
  }

  reloadData(): void {
    if (this.currentClientInstance !== null) {
      this.logService.getAllByClientInstanceId(this.currentClientInstance.id).subscribe(res => {
        this.logList.length = 0;
        for (let log of res) {
          this.logList.push(log);
        }
        this.dtTrigger.next();
      })
    }
  }
}

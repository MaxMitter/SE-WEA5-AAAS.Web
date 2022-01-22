import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientInstance} from "../../shared/client/client-instance";
import {Subject} from "rxjs";
import {LogMessageService} from "../../shared/logmessage/log-message.service";
import {LogMessage, LogType} from "../../shared/logmessage/log-message";
import {DataTableDirective} from "angular-datatables";

@Component({
  selector: 'app-logmessage',
  templateUrl: './logmessage.component.html',
  styleUrls: ['./logmessage.component.css']
})
export class LogmessageComponent implements OnInit {

  currentClientInstance: ClientInstance | null = null;
  logList: LogMessage[] = [];
  logListFiltered: LogMessage[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private logService: LogMessageService) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      processing: true,
      language: {
        processing: '<fa-icon icon="spinner" spin></fa-icon>'
      },
      data: this.logListFiltered,
      columns: [{
        title: 'Measurement Name',
        data: 'measurementName'
      }, {
        title: 'Created At',
        data: 'createdAtDate',
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
          this.logListFiltered.push(log);
        }
        this.dtTrigger.next();
      })
    }
  }

  updateData(type: string) {
    switch (type) {
      case 'Trace':
        if ($('#Trace').is(':checked')) {
          console.log('checked');
          for (let log of this.logList.filter(log => log.logType == LogType.Trace)) {
            this.logListFiltered.push(log);
          }
          this.dtTrigger.next();
        } else {
          console.log('unchecked');
          this.logListFiltered = this.logListFiltered.filter(log => log.logType != LogType.Trace);
          this.dtTrigger.next();
        }
        break;
      case 'Warning':
        break;
      case 'Error':
        break;
    }
  }
}

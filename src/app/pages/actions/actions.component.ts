import {Component, OnInit} from '@angular/core';
import {ClientInstance} from "../../shared/client/client-instance";
import {Action} from "../../shared/action/action";
import {ActionService} from "../../shared/action/action.service";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  currentClientInstance: ClientInstance | null = null;
  actionList: Action[] = [];

  constructor(
    private actionService: ActionService
  ) {
  }

  ngOnInit(): void {
    this.loadActions();
  }

  loadActions(): void {
    if (this.currentClientInstance !== null)
      this.actionService.getAllByClientInstanceId(this.currentClientInstance.id).subscribe(res => this.actionList = res);
  }

  clientChangedEvent(clientInstance: ClientInstance) {
    this.currentClientInstance = clientInstance;
    this.loadActions();
  }

  deleteAction(actionId: string) {
    if (this.actionService.deleteAction(actionId).subscribe()) {
      this.actionList = this.actionList.filter(action => action.id != actionId);
    }
  }
}

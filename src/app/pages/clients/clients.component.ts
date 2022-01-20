import {Component, Input, OnInit} from '@angular/core';
import {ClientInstance} from "../../shared/client/client-instance";
import {ClientService} from "../../shared/client/client.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  @Input() clientList: Array<ClientInstance> = [];
  isEditMode: boolean = true;

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.clientService.getAllByAppKey().subscribe(res => {
      this.clientList = res;
    });
  }

  clientChanges(clientInstance: ClientInstance) {

  }

  createNewClient() {
    let newId: string = "";
    this.clientService.createNewClient().subscribe(res => newId = res);
    let newClient = new ClientInstance(newId, 'NewClient');
    this.clientList.unshift(newClient);
  }

  deleteClient(id: string) {
    this.clientService.deleteClient(id).subscribe(res => {});
  }
}

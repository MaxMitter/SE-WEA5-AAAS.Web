import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientInstance} from "../../shared/client/client-instance";
import {DetectorService} from "../../shared/detector/detector.service";
import {ClientService} from "../../shared/client/client.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = "";
  @Output() onClientChanged: EventEmitter<any> = new EventEmitter();

  currentClient: ClientInstance | null = null;
  selectableClients: ClientInstance[] = [];

  constructor(
    private detectorService: DetectorService,
    private clientInstanceService: ClientService
  ) { }

  ngOnInit(): void {
    this.clientInstanceService.getAllByAppKey().subscribe(res => this.selectableClients = res);
  }

  selectClient(id: string | null) {
    this.currentClient = this.selectableClients.find(client => client.id === id) ?? null;
    this.onClientChanged.emit([this.currentClient]);
  }
}

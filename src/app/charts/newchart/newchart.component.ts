import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditChartComponent} from "../editchart/edit-chart.component";

@Component({
  selector: 'app-newchart',
  templateUrl: './newchart.component.html',
  styleUrls: ['./newchart.component.css']
})
export class NewchartComponent implements OnInit {

  @Output() onChartCreated: EventEmitter<any> = new EventEmitter();

  closeResult = '';

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  open(): void {
    this.modalService.open(EditChartComponent, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result === 'Save click') {
        let type = $('#chartType');
        let metric = $('#metricName').val();
        this.onChartCreated.emit([$('#chartType').val(), $('#metricName').val()]);
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {
  @Input() title: string = '';
  @Input() description: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  cancel() {
    this.activeModal.close(false);
  }

  accept() {
    this.activeModal.close(true);
  }
}

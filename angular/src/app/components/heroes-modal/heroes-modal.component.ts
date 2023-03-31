import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-heroes-modal',
  templateUrl: './heroes-modal.component.html',
  styleUrls: ['./heroes-modal.component.css'],
})
export class HeroesModalComponent {
  @Input() hero: Hero = new Hero();
  constructor(private heroService: HeroService, public modal: NgbModal, public activeModal: NgbActiveModal) {}

  saveHero() {
    const modalRef = this.modal.open(ConfirmationComponent, {
      centered: true,
    });

    modalRef.componentInstance.title = this.hero.id ? 'Edit hero ' + this.hero.id : 'Add hero';
    modalRef.componentInstance.description = this.hero.id
      ? 'Are you sure you want to edit this hero?'
      : 'Are you sure you want to create this hero?';

    modalRef.result.then((result: boolean) => {
      if (result) {
        if (this.hero.id) {
          this.heroService.editHero(this.hero).subscribe((response: Hero) => {
            this.activeModal.close(response);
          });
        } else {
          this.heroService.addHero(this.hero).subscribe((response: Hero) => {
            this.activeModal.close(response);
          });
        }
      }
    });
  }
}

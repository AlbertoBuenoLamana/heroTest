import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { ApiAccessService } from 'src/app/services/apiaccess.service';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { HeroService } from 'src/app/services/hero.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeroesModalComponent } from '../heroes-modal/heroes-modal.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-heroes-home',
  templateUrl: './heroes-home.component.html',
  styleUrls: ['./heroes-home.component.css'],
})
export class HeroesHomeComponent implements OnInit {
  constructor(private heroService: HeroService, public modal: NgbModal) {}
  //todos los que vienen del webservices
  allHeroes: Hero[] = [];
  //todos los que se van a mostrar en la vista paginados
  paginatedHeroes: Hero[] = [];
  //todos los que haya si se ha filtrado
  filteredHeroes: Hero[] = [];

  currentPage: number = 1;
  defaultLimit: number = 5;
  searchTerm: string = '';
  searchId: string = '';
  heroes$: Subscription | undefined;

  ngOnInit(): void {
    this.heroes$ = this.heroService.getHeroes().subscribe((response: Hero[]) => {
      this.allHeroes = response;
      this.paginateData(this.currentPage, this.defaultLimit);
    });
  }

  paginateData(page: number, limit: number): void {
    this.heroService
      .getHeroesPagination(page, limit, this.searchTerm.length > 0 ? this.searchTerm : undefined)
      .subscribe((response: Hero[]) => {
        this.paginatedHeroes = response;
      });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateData(this.currentPage, this.defaultLimit);
    }
  }

  nextPage() {
    //si el numero de elementos que hay en la pagina es igual al limite por defecto, "supongo" que hay mas paginas
    if (this.paginatedHeroes.length === this.defaultLimit) {
      this.currentPage++;
      this.paginateData(this.currentPage, this.defaultLimit);
    }
  }

  searchByTerm() {
    this.currentPage = 1;
    this.paginateData(this.currentPage, this.defaultLimit);
  }

  searchById() {
    this.currentPage = 1;
    if (this.searchId) {
      this.heroService.getHero(+this.searchId).subscribe(
        (response: Hero) => {
          this.paginatedHeroes = [response];
        },
        error => {
          this.paginatedHeroes = [];
        }
      );
    } else {
      this.paginateData(this.currentPage, this.defaultLimit);
    }
  }

  editHero(hero: Hero) {
    //le cambio la direccion de memoria para que no se modifique el objeto original
    let heroCopy = {};
    Object.assign(heroCopy, hero);

    const modalRef = this.modal.open(HeroesModalComponent, { centered: true, size: 'xl' });
    modalRef.componentInstance.hero = heroCopy;
    modalRef.result.then(
      result => {
        this.paginateData(this.currentPage, this.defaultLimit);
      },
      reason => {
        this.modal.dismissAll();
      }
    );
  }

  createNewHero() {
    const modalRef = this.modal.open(HeroesModalComponent, { centered: true, size: 'xl' });
    modalRef.componentInstance.hero = new Hero();
    modalRef.result.then(
      result => {
        this.paginateData(this.currentPage, this.defaultLimit);
      },
      reason => {
        this.modal.dismissAll();
      }
    );
  }

  deleteHero(hero: Hero) {
    const modalRef = this.modal.open(ConfirmationComponent, {
      centered: true,
    });

    modalRef.componentInstance.title = 'Deleting hero ' + hero.id;
    modalRef.componentInstance.description = 'Are you sure you want to delete this hero?';
    modalRef.result.then((result: boolean) => {
      if (result) {
        this.heroService.deleteHero(hero).subscribe((response: Hero) => {
          this.paginateData(this.currentPage, this.defaultLimit);
        });
      }
    });
  }
}

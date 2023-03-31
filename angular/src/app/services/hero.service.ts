import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Hero } from '../models/hero';
import { ApiAccessService } from './apiaccess.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private apiAccessService: ApiAccessService) {}
  heroes$ = new BehaviorSubject<Array<Hero>>([]);
  /**
   * Obtenemos los activos
   * @param id
   * @returns
   */

  getHeroes(): Observable<any> {
    return new Observable<any>(observer => {
      if (this.heroes$.value.length === 0) {
        this.apiAccessService.get('heroes').subscribe((response: Hero[]) => {
          this.heroes$.next(response);
          observer.next(response);
          observer.complete();
        });
      } else {
        observer.next(this.heroes$.value);
        observer.complete();
      }
    });
  }
  getHero(id: number): Observable<any> {
    return new Observable<any>(observer => {
      this.apiAccessService.get('heroes/' + id).subscribe(
        (response: Hero[]) => {
          observer.next(response);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  getHeroesPagination(page: number, limit: number = 20, name?: string | undefined): Observable<any> {
    let url = 'heroes?_page=' + page + '&_limit=' + limit;
    if (name) {
      url = url + '&name_like=' + name;
    }
    return new Observable<any>(observer => {
      this.apiAccessService.get(url).subscribe((response: Hero[]) => {
        observer.next(response);
        observer.complete();
      });
    });
  }

  addHero(hero: Hero) {
    const nextId = Math.max(...this.heroes$.value.map((h: Hero) => parseInt(h.id))) + 1;
    hero.id = nextId + '';

    return new Observable<any>(observer => {
      this.apiAccessService.post('heroes', hero).subscribe((response: Hero) => {
        this.heroes$.next([...this.heroes$.value, response]);
        observer.next(response);
        observer.complete();
      });
    });
  }

  editHero(hero: Hero) {
    return new Observable<any>(observer => {
      this.apiAccessService.put('heroes/' + hero.id, hero).subscribe((response: Hero) => {
        const heroes = this.heroes$.value;
        const index = heroes.findIndex((h: Hero) => h.id === hero.id);
        heroes[index] = response;
        this.heroes$.next(heroes);
        observer.next(response);
        observer.complete();
      });
    });
  }

  deleteHero(hero: Hero) {
    return new Observable<any>(observer => {
      this.apiAccessService.delete('heroes/' + hero.id).subscribe((response: Hero) => {
        const heroes = this.heroes$.value;
        const index = heroes.findIndex((h: Hero) => h.id === hero.id);
        heroes.splice(index, 1);
        this.heroes$.next(heroes);
        observer.next(response);
        observer.complete();
      });
    });
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesModalComponent } from './heroes-modal.component';

describe('HeroesModalComponent', () => {
  let component: HeroesModalComponent;
  let fixture: ComponentFixture<HeroesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

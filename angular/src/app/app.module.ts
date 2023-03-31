import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './routes/app.routing';

import { AppComponent } from './app.component';
import { HeroesHomeComponent } from './components/heroes-home/heroes-home.component';
import { ApiAccessService } from './services/apiaccess.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeroesModalComponent } from './components/heroes-modal/heroes-modal.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

@NgModule({
  declarations: [AppComponent, HeroesHomeComponent, HeroesModalComponent, ConfirmationComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, NgbModule],
  providers: [ApiAccessService],
  bootstrap: [AppComponent],
})
export class AppModule {}

export const BASE_URL = environment.url_base;

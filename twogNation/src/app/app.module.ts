import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppRoutingModule} from './app-routing.module';
import {MaterialModule} from './material.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import {RequestInterceptor} from '../shared/interceptor';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {MainComponent} from './components/main/main.component';
import {TournamentsCardComponent} from './components/tournaments-card/tournaments-card.component';
import { DeleteModalComponent } from './components/modals/delete-modal/delete-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    TournamentsCardComponent,
    DeleteModalComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    InfiniteScrollModule,
  ],
  providers: [HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

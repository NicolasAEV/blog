import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { FavoriteComponent } from './features/favorite/favorite.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrincipalpageComponent } from './features/principalpage/principalpage.component';
import { FilterComponent } from './components/filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from './features/services/services.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoriteComponent,
    NavbarComponent,
    PrincipalpageComponent,
    FilterComponent,
  ],
  
  imports: [
    HttpClientModule ,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

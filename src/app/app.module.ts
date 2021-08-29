import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//MIS RUTAS
import { routing } from './app.routing';
import { appRoutingProviders } from './app.routing';

//MIS COMPONENTES
import { HomeComponent } from './components/home.component';
@NgModule({
  declarations: [
    AppComponent,
    //Mis declarations
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing
  ],
  providers: [ appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

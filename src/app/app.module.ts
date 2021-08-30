import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//MIS RUTAS
import { routing } from './app.routing';
import { appRoutingProviders } from './app.routing';

//MIS COMPONENTES
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { ProductosListComponent } from './components/producto.component';
import { ProductoAddComponent } from './components/producto-add.component';
import { ProductodetailComponent } from './components/producto-detail.component';
import { ProductoEditComponent } from './components/producto-edit.component';

//import para los servicios api rest
import { HttpClientModule } from '@angular/common/http';

//import para los FORMULARIOS
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    //Mis declarations
    HomeComponent,
    ErrorComponent,
    ProductosListComponent,
    ProductoAddComponent,
    ProductodetailComponent,
    ProductoEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [ appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

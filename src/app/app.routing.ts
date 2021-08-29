import { ModuleWithProviders } from "@angular/core";
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";

//IMPORTAR NUESTROS COMPONENTES
import { HomeComponent } from "./components/home.component";


//CREAR VARIABLE ARRAY DE RUTAS
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: '**', component: HomeComponent}
];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
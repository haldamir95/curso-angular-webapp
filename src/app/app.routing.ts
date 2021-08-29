import { ModuleWithProviders } from "@angular/core";
import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";

//IMPORTAR NUESTROS COMPONENTES
import { HomeComponent } from "./components/home.component";
import { ErrorComponent } from "./components/error.component";
import { ProductosListComponent } from "./components/producto.component";
import { ProductoAddComponent } from "./components/producto-add.component";



//CREAR VARIABLE ARRAY DE RUTAS
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'productos', component: ProductosListComponent },
    {path: 'crear-producto', component: ProductoAddComponent},
    
    {path: '**', component: ErrorComponent}
];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
//importar modulo de componente
import { Component } from "@angular/core";

//importar modulos de router y parametros
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Params } from "@angular/router";

//importar el servicio de productos
import { ProductoService } from "../services/producto.service";

//importar modelo de producto
import { Producto } from "../models/producto";



//DECORADOR DEL COMPONENTE
@Component(
    {
        selector: 'producto-add',
        templateUrl: '../views/producto-add.html',
        //injectar servicio
        providers: [ProductoService]
    }
)


//exportar clase
export class ProductoAddComponent{

    public titulo!:string;

    constructor(){
        this.titulo = 'Crear un Nuevo Producto';
    }


    ngOnInit(){
        console.log('componente Producto-add.Component.ts cargado')
    }
}
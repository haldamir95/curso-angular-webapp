import { Component} from "@angular/core";


//Importaciones para la obtencion de parametros como formulario
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Params } from "@angular/router";


@Component(
    {
        selector: 'productos-list',
        templateUrl: '../views/productos-list.html'
    }
)


export class ProductosListComponent{

    public titulo!:string;


    constructor(
        //propiedades privadas para el servicio de router
        private _route: ActivatedRoute,
        private _router: Router
    ){

        this.titulo='Listado de Productos';
    }


    ngOnInit(){
        console.log('Componente producto.component.ts cargado');
    }

}

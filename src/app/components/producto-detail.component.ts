import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Params } from "@angular/router";
import { Producto } from "../models/producto";

import { ProductoService } from "../services/producto.service";
import { ProductosListComponent } from "./producto.component";


@Component(
    {
        selector: 'producto-detail' ,
        templateUrl : '../views/producto-detail.html',
        providers: [ ProductoService ]
    }
)

export class ProductodetailComponent{

    public producto!:Producto;

    constructor(
        private _productoService : ProductoService,
        private _route : ActivatedRoute,
        private _router : Router
    ){

    }


    ngOnInit(){
        console.log('producto-detail.component.ts cargado');
        //ejecutar getProducto al mometo de cargar el componente
        this.getProducto();
    }


    getProducto(){
        //obtener todos los parametros
        this._route.params.forEach((params: Params) => {

            //buscar el parametro que se llama id
            let id = params['id'];
            
            //utilizar el servicio para consumir el API que devuelve el producto
            //utilizar SUBSCRIBE para tener las funciones de flecha result y error
            this._productoService.getProducto(id).subscribe(
                response=>{
                    if(response.code == 200){
                        this.producto = response.data;
                    }else{
                        this._router.navigate(['/productos']);
                    }
                },
                error=>{
                    console.log(<any>error)
                }
            );
        })
    }

}
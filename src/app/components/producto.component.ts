import { JsonpClientBackend } from "@angular/common/http";
import { Component} from "@angular/core";


//Importaciones para la obtencion de parametros como formulario
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Params } from "@angular/router";
import { Producto } from "../models/producto";

//Importar nuestro servicio de productos
import { ProductoService } from "../services/producto.service";


@Component(
    {
        selector: 'productos-list',
        templateUrl: '../views/productos-list.html',
        providers: [ProductoService]
    }
)


export class ProductosListComponent{

    public titulo!:string;

    //arreglo de productos 
    public productos!:Producto[];

    //variable para confirmar la eliminacion
    public confirmado!:string;


    constructor(
        //propiedades privadas para el servicio de router
        private _route: ActivatedRoute,
        private _router: Router,
        private _productoService: ProductoService
    ){

        this.titulo='Listado de Productos';
        this.confirmado = "";
    }


    ngOnInit(){
        console.log('Componente producto.component.ts cargado');
        
        this.getProductos();

    }


    borrarConfirm(id:string){
        this.confirmado = id;
    }

    cancelarConfirm(){
        this.confirmado = "";
    }

    onDeleteProducto(id:string){
        this._productoService.deleteProducto(id).subscribe(
            response => {
                if(response.code ==200){
                    this.getProductos();
                }else{
                    alert('Error al eliminar');
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }


    getProductos(){
        //utilizar el servicio producto para llamar al metodo getproducto 
        //utilizar el subscribe para usar los metodos de flecha result y error 
        this._productoService.getProductos().subscribe(
            result => {
                if(result.code != "200"){
                    console.log(result);
                }else{
                    //asignar la data del servicio al arreglo de tipo Producto
                    this.productos = result.data;
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

}

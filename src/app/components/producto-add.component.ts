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


//importar variables de entorno GLOBAL
import { GLOBAL } from "../services/global";


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
    public producto!:Producto;
    public is_edit!:boolean;

    constructor(
        //Agregar las propiedades privadas para utilizar el servicio del producto
        private _productoService : ProductoService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.titulo = 'Crear un Nuevo Producto';
        this.producto = new Producto(0,"","",0,"");
        this.is_edit = false;
    }


    ngOnInit(){
        console.log('componente Producto-add.Component.ts cargado')
    }

    onSubmit(){
        console.log(this.producto);

        //validar que se quiera subir un producto
        if(this.filesToUpload && this.filesToUpload.length >= 1){
            //INTENTAR SUBIR EL ARCHIVO 
            this._productoService.makeFileRequest(GLOBAL.url+'/upload-file',[],this.filesToUpload).then(
                (result)=>{
                    //el result viene como un objeto desconocido, lo pasamos a jsonstringify
                    let cadena = JSON.stringify(result);
                    //ahora que lo tenemos como cadena lo regresamos a json
                    let json = JSON.parse(cadena);
                    console.log(json);
                    //ahora el result esta en la var json y ya podemos acceder a sus propiedades
                    this.producto.imagen = json.filename;
                    //CUANDO SE HAYA SUBIDO CORRECTAMENTE EL ARCHIVO, SE GUARDA LA INFORMACION EN LA BASE DE DATOS
                    this.saveProducto();
                },
                (error)=>{
                    console.log(error);
                }
            );
        }else{
            this.saveProducto();
        }
        
    }


    saveProducto(){
        //utilizando el servicio mandar como parametro el producto
        //utilizar el metodo subscribe de los Observable para utilizar los resultados callback response y error
        this._productoService.addProducto(this.producto).subscribe(
            response => {
                if(response.code == 200){
                    this._router.navigate(['/productos']);
                }else{
                    console.log(response);
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }



    //variables globales para subir archivos
    public filesToUpload!:any;
    public resultUpload!:any;
    fileChangeEvent(fileInput: any){

        //obtener el input file y monta el archivo en un array
        this.filesToUpload = <Array<File>>fileInput.target.files;
        
        console.log(this.filesToUpload);
    }
}
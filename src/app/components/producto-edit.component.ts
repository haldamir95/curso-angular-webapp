import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Params } from "@angular/router";
import { Producto } from "../models/producto";
import { GLOBAL } from "../services/global";
import { ProductoService } from "../services/producto.service";

@Component(
    {
        selector: 'producto-edit',
        templateUrl: '../views/producto-add.html', 
        providers: [ProductoService]
    }
)


export class ProductoEditComponent{

    public titulo!:string;
    public producto!:Producto;
    public is_edit!:boolean; //variable para saber si estamos editando
    public filesToUpload!:any;
    public resultUpload!:any;


    constructor(
        private _productoService : ProductoService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.titulo = 'Editar Producto';
        this.producto = new Producto(1,"","",1,"");
        this.is_edit = true; //como estamos en producto-edit es por que si estamos editando (lo utilizamos en la vista)
    }


    ngOnInit(){
        this.getProducto();
        //Al momento de utilizar el metodo GETPRODUCTO, guardamos los valores obtenidos del producto del servicio
        //en la instancia del modelo producto que tenemos, por lo tanto, ya que tenemos el two way data binding activado en la vista
        //utilizando el ngModel, al momento de llenar la variable this.producto, se llena automaticamente el formulario



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
                    this.updateProducto();
                },
                (error)=>{
                    console.log(error);
                }
            );
        }else{
            this.updateProducto();
        }
        
    }


    updateProducto(){
        //obtener todos los parametros
        this._route.params.forEach((params: Params) => {

            //buscar el parametro que se llama id
            let id = params['id'];

            this._productoService.editProducto(id, this.producto).subscribe(
                response => {
                    if(response.code == 200){
                        this._router.navigate(['/producto/',id]);
                    }else{
                        console.log(response);
                    }
                },
                error => {
                    console.log(<any>error);
                }
            );

        });
    }


    fileChangeEvent(fileInput: any){
        //obtener el input file y monta el archivo en un array
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }




    //Obtener producto con los servicios
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
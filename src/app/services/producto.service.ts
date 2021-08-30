//importacion para hacer Injectable
import { Injectable } from "@angular/core";

//importaciones para los servicios con protocolos http
import { HttpClient, XhrFactory } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

//Importacion del modelo
import { Producto } from "../models/producto";
//Importacion de las globales
import { GLOBAL } from "./global";


@Injectable()



export class ProductoService{

    public url!:string;

    constructor(
        //Definir atributo para hacer peticiones AJAX 
        public _http: HttpClient
    ){
        //obtener la url de nuestros servicios 
        this.url = GLOBAL.url;
    }


    getProductos(){
        return this._http.get(this.url+'/productos').pipe(map(res => JSON.parse(JSON.stringify(res))));
    }

    addProducto(producto: Producto){
        //Convertir el objeto producto en JSON para enviarlo al API
        let json = JSON.stringify(producto);
        //Crear la variable json que se envia al servicio
        let params = 'json='+json;
        //definir header para definir como nuestro backend procesa la informacion que llega por post
        //tomar en cuenta que se utiliza HttpHeaders en esta version de Angular
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        //hacer la peticion y devolver el resultado
        //transformar el res a un string y despues a un json.parser para que pueda ser utilizado por JavaScript
        return this._http.post(this.url+'/productos', params, {headers: headers}).pipe(map(res => JSON.parse(JSON.stringify(res))));
    }


    makeFileRequest(url:string, params: Array<string>, files: Array<File>){

        return new Promise((resolve, reject)=>{
            //variable para simular un formulario
            var formData: any = new FormData();
            //variable para tener disponible las peticiones AJAX
            var xhr = new XMLHttpRequest();

            //foor para recorer el array de archivos
            for(var i =0; i<files.length; i++){
                formData.append('uploads[]', files[i], files[i].name);
            }

            //cuando la peticion este preparada hacer una funcion anonima
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response))
                    }else{
                        reject(xhr.response);
                    }
                }
            };

            //abrir la peticion
            xhr.open("POST", url, true);
            //enviar el formulario
            xhr.send(formData);

        });
    }

}
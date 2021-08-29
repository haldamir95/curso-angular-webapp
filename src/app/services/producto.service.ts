//importacion para hacer Injectable
import { Injectable } from "@angular/core";

//importaciones para los servicios con protocolos http
import { HttpClient } from "@angular/common/http";
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

}
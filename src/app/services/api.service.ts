import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  rutaBase: string = 'https://fer-sepulveda.cl/API_PRUEBA2/api-service.php'
  
  constructor(private http: HttpClient) { }

  UsuarioAlmacenar(correo, contraseña, nombre, apellido) {
    let that = this;

    return new Promise(resolve => {
      resolve(that.http.post(that.rutaBase, {
        nombreFuncion: "UsuarioAlmacenar",
        parametros: [correo, contraseña, nombre, apellido]
      }).toPromise())
    })
  }

  UsuarioLogin(correo, contraseña) {
    let that = this;

    return new Promise(resolve => {
      resolve(that.http.post(that.rutaBase, {
        nombreFuncion: "UsuarioLogin",
        parametros: [correo, contraseña]
      }).toPromise())
    })
  }

  UsuarioListar() {
    let that = this;

    return new Promise(resolve => {
      resolve(that.http.get(that.rutaBase 
        + '?nombreFuncion=UsuarioListar').toPromise())
    })
  }

  AsistenciaAlmacenar(correo: string, id_clase: string) {
    let that = this;

    return new Promise(resolve => {
      resolve(that.http.post(that.rutaBase, {
        nombreFuncion: "AsistenciaAlmacenar",
        parametros: [correo, id_clase]
      }).toPromise())
    })
  }

}

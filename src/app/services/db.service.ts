import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  validador: boolean = false;
  passreult: string = "";

  constructor(private sqlite: SQLite, private router: Router) {
    // SE CREA LA BASE DE DATOS
    this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS PERSONA(CORREO VARCHAR(30), ' 
        + 'NOMBRE VARCHAR(30), APELLIDO VARCHAR(30), ' 
        + 'CONTRASEÑA VARVHAR(30))', []).then(() => {
          console.log('Base de datos OK');
        }).catch(e => {
          console.log('Tabla no ok')
        }).catch(e => {
          console.log('Base de datos no ok')
        })
    });
  }


  almacenarPersona(correo, nombre, apellido, pass) {
    this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO PERSONA VALUES(?, ?, ?, ?)', 
      [correo, nombre, apellido, pass]).then(() => {
          console.log('Base de datos OK');
        })
    });
  }

  listarPersonas() {
    return this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT CORREO, NOMBRE, APELLIDO, CONTRASEÑA ' 
        + ' FROM PERSONA', []).then((data) => {
          return data;
        })
    });
  }

  buscarPersonas(nombre) {
    return this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT CORREO, NOMBRE, APELLIDO, CONTRASEÑA ' 
        + ' FROM PERSONA WHERE NOMBRE LIKE ?', [nombre + '%']).then((data) => {
          return data;
        })
    });
  }

  buscaruser(mdl_email,mdl_pass) {
    return this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT CONTRASEÑA ' 
        + ' FROM PERSONA WHERE CORREO LIKE ?', [mdl_email]).then((data) => {
          this.passreult = data.rows.item(0).pass;
          console.log('el pepe '+mdl_pass)
          console.log('el yorsh'+this.passreult)
          if(this.passreult === mdl_pass){
            console.log('el pepe entro');
            this.validador = true;
            
            return true;}else{
              this.validador = false;
              return false;
            }})
    });
  }

  eliminarPersona(correo) {
    this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM PERSONA WHERE CORREO = ?', 
      [correo]).then(() => {
          console.log('FSR: Persona eliminada correctamente');
        })
    });
  }



  
  canActivate() {
    if(this.validador) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  validarCredenciales(email, pass) {
    var usuarios = JSON.parse(localStorage.usuarios);
    var usuario_login = usuarios.find(x=>x.mdl_email == email);
    if(usuario_login!==undefined && usuario_login!==null){
      if(pass == usuario_login.mdl_pass) {
        this.validador = true;
        this.router.navigate(['principal']);
        return true;
      } else {
        return false;
      }
    }else{
      return false;
    }
  }

  crearUsuario(user, pass, email) {
    var usuarios = JSON.parse(localStorage.usuarios);
    var buscar_usuario_email = usuarios.find(x=>x.mdl_email == email);
    var buscar_usuario_nombre = usuarios.find(x=>x.mdl_user == user);


    if(buscar_usuario_email!==undefined && buscar_usuario_email!==null){
      return "Email se encuentra registrado";
    }else{
      if(buscar_usuario_nombre!==undefined && buscar_usuario_nombre!==null){
        return "Usuario se encuentra registrado";
      }else{
        usuarios.push({

          mdl_pass: pass,
          mdl_email:email
        });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        this.router.navigate(['login']);
        return true;
      }
    }
  }

  cambiarPass(user, pass, email) {
    var usuarios = JSON.parse(localStorage.usuarios);
    var buscar_usuario_email = usuarios.find(x=>x.mdl_email == email);

    if(buscar_usuario_email!==undefined && buscar_usuario_email!==null){
      if(buscar_usuario_email.mdl_user === user){
        buscar_usuario_email.mdl_pass=pass;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        this.router.navigate(['login']);
        return true;
      }else{
        return "No se pudo validar usuario";
      }
    }else{
      return "Email no se encuentra registrado";
    }
  }
}

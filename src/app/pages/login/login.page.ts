import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_email: string = '';
  mdl_pass: string = '';

  constructor(private router: Router, 
    private alertController: AlertController,
    private toastController: ToastController,
    private db: DbService) { }

  ngOnInit() {
    var usuarios = [{
      mdl_user:'admin',
      mdl_pass: 'admin',
      mdl_email:'admin@admin.cl'
    },{
      mdl_user:'usuario1',
      mdl_pass: 'pass1',
      mdl_email:'usuario1@correo.cl'
    }];
    if(localStorage.usuarios===undefined){
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  }

  navegar() {
    this.router.navigate(['register']);
  }

  ingresar() {
    if(!this.db.validarCredenciales(this.mdl_email, this.mdl_pass)) {
      this.mostrarMensaje('Credenciales Inválidas');
    }else{
      localStorage.email_usuario_login = this.mdl_email;
      this.mostrarToast();
      this.router.navigate(['principal'])
    }
  }
  
  async mostrarMensaje(mensaje) {
    const alert = await this.alertController.create({
      header: 'Información',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async mostrarToast() {
    const toast = await this.toastController.create({
      message: 'Bienvenido ' + this.mdl_email,
      duration: 2000,
      icon: 'information-circle',
      color: "light"
    });
    toast.present();
  }





}

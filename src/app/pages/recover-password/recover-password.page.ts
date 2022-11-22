import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {
  mdl_user: string = '';
  mdl_pass: string = '';
  mdl_passnew: string = '';
  mdl_email: string = '';
  formGrp: FormGroup;
  constructor(private router: Router, 
    private alertController: AlertController,
    private toastController: ToastController,
    private db: DbService,
    formBuilder: FormBuilder
  ){ 
    this.formGrp = formBuilder.group({
      emailidctrl: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      userctrl: ['', [Validators.required, Validators.minLength(4)]],
      passwordcrl: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit() {
  }

  cambiarPassword() {
    
    var respuesta = this.db.cambiarPass(this.mdl_user, this.mdl_pass,this.mdl_email);
    if(respuesta===true) {
      this.mostrarToast();
    }else{
      this.mostrarMensaje(respuesta);
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
      message: '¡Contraseña Actualizada Correctamente!',
      duration: 2000,
      icon: 'information-circle',
      color: "success"
    });
    toast.present();
  }
}

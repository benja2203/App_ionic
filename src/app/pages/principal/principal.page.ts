import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { $ } from 'protractor';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  texto: string = '';

  constructor(private api: ApiService,private alertController: AlertController) { }

  ngOnInit() {
  }



  async leerQR() {
    this.cambiarEstados(true);
    document.querySelector('body').classList.add('scanner-active');

    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      this.texto = result.content;
      this.cambiarEstados(false);
      this.enviarAsistencia(this.texto);
    }

    document.querySelector('body').classList.remove('scanner-active');
  };

  cerrarQR() {
    this.cambiarEstados(false);
    document.querySelector('body').classList.remove('scanner-active');
  }

  cambiarEstados(estado: boolean) {
    const slides_principal = document.getElementById('slides_principal');
    const boton_cerrar_qr = document.getElementById('boton_cerrar_qr');
    const boton_abrir_qr = document.getElementById('boton_abrir_qr');
    const menu = document.getElementById('menu');
    slides_principal.hidden=estado;
    boton_abrir_qr.hidden=estado;
    menu.hidden=estado;
    boton_cerrar_qr.hidden=!estado;
  }

  async enviarAsistencia(codigo_qr: string) {
    let data: any;
    data = await this.api.AsistenciaAlmacenar(localStorage.email_usuario_login,codigo_qr);
    let validate = 0;
    let mensaje = "No pudimos registrar asistencia";
    if(data !==null){
      if(data.result!== null && data.result.length>0){
        let respuesta = data.result[0].RESPUESTA;
        if(respuesta === "OK"){
          mensaje = "Asistencia Registrada Correctamente";
        }else if(respuesta === "ERR03"){
          mensaje = "Su Asistencia Ya Se Encuentra Registrada En Esta Clase";
        }
        validate = 1;
      }
    }

    const alert = await this.alertController.create({
      header: 'Información',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
    
  }

}

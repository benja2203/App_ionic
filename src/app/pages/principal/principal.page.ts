import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { $ } from 'protractor';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  texto: string = '';

  constructor() { }

  ngOnInit() {
  }



  async leerQR() {
    const slides_principal = document.getElementById('slides_principal');
    const boton_cerrar_qr = document.getElementById('boton_cerrar_qr');
    const boton_abrir_qr = document.getElementById('boton_abrir_qr');
    const menu = document.getElementById('menu');

    slides_principal.hidden=true;
    boton_abrir_qr.hidden=true;
    menu.hidden=true;
    boton_cerrar_qr.hidden=false;
    document.querySelector('body').classList.add('scanner-active');

    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      this.texto = result.content;
    }

    document.querySelector('body').classList.remove('scanner-active');
  };

  cerrarQR() {
    const slides_principal = document.getElementById('slides_principal');
    const boton_cerrar_qr = document.getElementById('boton_cerrar_qr');
    const boton_abrir_qr = document.getElementById('boton_abrir_qr');
    const menu = document.getElementById('menu');
    slides_principal.hidden=false;
    boton_abrir_qr.hidden=false;
    menu.hidden=false;
    boton_cerrar_qr.hidden=true;
    document.querySelector('body').classList.remove('scanner-active');
  }

}

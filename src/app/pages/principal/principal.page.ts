import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

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
    document.querySelector('body').classList.add('scanner-active');

    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      this.texto = result.content;
    }

    document.querySelector('body').classList.remove('scanner-active');
  };

}

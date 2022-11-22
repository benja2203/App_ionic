import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import {ApiService} from 'src/app/services/api.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  mdl_nombre: string = '';
  mdl_apellido: string = '';
  mdl_pass: string = '';
  mdl_email: string = '';
  formGrp: FormGroup;
  
  constructor(private router: Router, private api: ApiService,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
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
    this.loadingController.create({
      message: '',
      spinner: 'lines-sharp'
    }).then(res => {
      res.dismiss()
    })
  }


  almacenar() {
    this.db.almacenarPersona(this.mdl_email, this.mdl_nombre, 
      this.mdl_apellido, this.mdl_pass);
    console.log('BAF: PERSONA CREADA OK');
    this.router.navigate(['login'])
    this.mostrarMensaje('Registrado correctamente')
    }

    registrar() {
    
      var respuesta = this.db.crearUsuario(this.mdl_email, this.mdl_pass, this.mdl_nombre);
      if(respuesta===true) {
        this.mostrarToast();
      }else{
        this.mostrarMensaje(respuesta);
      }
    }

  async mostrarMensaje(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }

  async mostrarToast() {
    const toast = await this.toastController.create({
      message: '¡Usuario Registrado Correctamente!',
      duration: 2000,
      icon: 'information-circle',
      color: "light"
    });
    toast.present();
  }
}

import { Component, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements AfterViewInit {
  emailSent = false;

  constructor(private navCtrl: NavController, private dbService: DatabaseService) {}

  ngAfterViewInit() {
    $('#recoverForm').submit(async (event) => {
      event.preventDefault();
      $('.error-message').text('');

      const email = $('#email').val() as string;
      let isValid = true;

      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        $('#emailError').text('Ingresa un correo electrónico válido.');
        isValid = false;
      }

      if (isValid) {
        const isRegistered = await this.dbService.isEmailRegistered(email);
        if (isRegistered) {
          $('#emailSuccess').text('El correo de recuperación ha sido enviado.');
          this.emailSent = true;
          this.navCtrl.navigateForward('/login');
        } else {
          $('#emailError').text('El correo no está registrado.');
        }
      }
    });
  }
}

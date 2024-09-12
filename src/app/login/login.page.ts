import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { NavController } from '@ionic/angular';
import { NavegextraService } from '../services/navegextra.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {
  errorMessage = '';

  constructor(
    private navCtrl: NavController,
    private navegextraService: NavegextraService  // Inyectar el servicio
  ) { }

  ngAfterViewInit() {
    // Configurar la validación del formulario con jQuery
    $('#loginForm').submit((event) => {
      event.preventDefault(); // Prevenir el envío del formulario por defecto
      $('.error-message').text(''); // Limpiar mensajes de error

      // Obtener los valores del formulario
      const username = $('#username').val() as string;
      const password = $('#password').val() as string;

      let isValid = true;

      // Validación de nombre de usuario
      if (!username || username.trim() === '') {
        $('#usernameError').text('El nombre de usuario es obligatorio.');
        isValid = false;
      }

      // Validación de contraseña
      if (!password || password.trim() === '') {
        $('#passwordError').text('La contraseña es obligatoria.');
        isValid = false;
      }

      // Verificación de credenciales
      if (isValid) {
        const storedUser = this.navegextraService.getUserData();
        if (storedUser && storedUser.username === username && storedUser.password === password) {
          this.navCtrl.navigateForward(`/home?username=${username}`);
        } else {
          $('#formError').text('Usuario o contraseña incorrectos.');
        }
      }
    });

    // Redirección con Google (básica)
    $('.google-login-button').click(() => {
      const googleUser = 'Usuario de Google';
      this.navCtrl.navigateForward(`/home?username=${googleUser}`);
    });
  }
}

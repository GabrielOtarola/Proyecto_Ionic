import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {
  errorMessage = '';

  constructor(
    private navCtrl: NavController
  ) { }

  ngAfterViewInit() {
    // Validación del nombre de usuario en tiempo real: solo letras
    $('#username').on('input', function () {
      const username = $(this).val() as string;
      const regex = /^[A-Za-z]+$/; // Solo letras
      if (!regex.test(username)) {
        $('#usernameError').text('El nombre de usuario solo debe contener letras.');
      } else {
        $('#usernameError').text('');
      }
    });

    // Validación de la contraseña en tiempo real
    $('#password').on('input', function () {
      const password = $(this).val() as string;
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-zA-Z]{3,})(?=.*\d{4,}).{8,}$/;

      if (!passwordPattern.test(password)) {
        $('#passwordError').text('La contraseña debe tener al menos 1 mayúscula, 3 letras y 4 números.');
      } else {
        $('#passwordError').text('');
      }
    });

    // Validación completa al enviar el formulario
    $('#loginForm').submit((event) => {
      event.preventDefault(); // Prevenir el envío del formulario por defecto
      $('.error-message').text(''); // Limpiar mensajes de error

      // Obtener los valores del formulario
      const username = $('#username').val() as string;
      const password = $('#password').val() as string;

      let isValid = true;

      // Validación de nombre de usuario (solo letras)
      const regex = /^[A-Za-z]+$/;
      if (!username || username.trim() === '' || !regex.test(username)) {
        $('#usernameError').text('El nombre de usuario es obligatorio y solo debe contener letras.');
        isValid = false;
      }

      // Validación de contraseña (patrón)
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-zA-Z]{3,})(?=.*\d{4,}).{8,}$/;
      if (!password || password.trim() === '' || !passwordPattern.test(password)) {
        $('#passwordError').text('La contraseña debe tener al menos 1 mayúscula, 3 letras y 4 números.');
        isValid = false;
      }

      // Si todas las validaciones son correctas
      if (isValid) {
        // Limpiar el formulario
        (document.getElementById('loginForm') as HTMLFormElement).reset();

        // Redirigir al usuario a la página de inicio
        this.navCtrl.navigateForward(`/home?username=${username}`);
      } else {
        // Mostrar un mensaje de error si los campos son inválidos
        $('#formError').text('Por favor ingresa un nombre de usuario y una contraseña válidos.');
      }
    });

    // Redirección con Google (básica)
    $('.google-login-button').click(() => {
      const googleUser = {
        username: 'Usuario de Google',
        email: 'usuario_google@gmail.com', // Datos simulados
        provider: 'Google'
      };

      // Navegar a la página principal con los datos del usuario de Google
      this.navCtrl.navigateForward(`/home?username=${googleUser.username}`);
    });
  }

  // Método para cerrar sesión y simplemente redirigir al login
  logout() {
    this.navCtrl.navigateRoot('/login'); // Redirige al login sin guardar nada
  }
}


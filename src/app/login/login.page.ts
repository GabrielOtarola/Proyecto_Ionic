import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';  // Para recibir los queryParams

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {
  registeredUsername: string = ''; // Almacenar el nombre de usuario registrado
  registeredPassword: string = ''; // Almacenar la contraseña registrada

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute // Para recibir los `queryParams`
  ) {}

  ngAfterViewInit() {
    // Recibir los `queryParams` del registro
    this.route.queryParams.subscribe(params => {
      this.registeredUsername = params['username'] || '';
      this.registeredPassword = params['password'] || '';
      console.log('Datos recibidos del registro:', this.registeredUsername, this.registeredPassword);
    });

    // Validación de campos en tiempo real (igual que antes)
    $('#username').on('input', function () {
      const username = $(this).val() as string;
      const regex = /^[A-Za-z]+$/; // Solo letras
      if (!regex.test(username)) {
        $('#usernameError').text('El nombre de usuario solo debe contener letras.');
      } else {
        $('#usernameError').text('');
      }
    });

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

      // Validaciones básicas (igual que antes)
      if (!username || username.trim() === '' || !/^[A-Za-z]+$/.test(username)) {
        $('#usernameError').text('El nombre de usuario es obligatorio y solo debe contener letras.');
        isValid = false;
      }

      if (!password || password.trim() === '' || !/^(?=.*[A-Z])(?=.*[a-zA-Z]{3,})(?=.*\d{4,}).{8,}$/.test(password)) {
        $('#passwordError').text('La contraseña debe tener al menos 1 mayúscula, 3 letras y 4 números.');
        isValid = false;
      }

      if (isValid) {
        // Validar que las credenciales coincidan con las registradas
        if (username === this.registeredUsername && password === this.registeredPassword) {
          alert('Login exitoso');
          this.navCtrl.navigateForward(`/home?username=${username}`); // Redirigir a la página principal
        } else {
          $('#formError').text('Nombre de usuario o contraseña incorrectos.');
        }
      } else {
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

  // Método para cerrar sesión
  logout() {
    this.navCtrl.navigateRoot('/login'); // Redirigir al login
  }
}

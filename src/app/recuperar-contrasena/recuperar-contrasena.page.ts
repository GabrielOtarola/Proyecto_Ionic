import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements AfterViewInit {
  emailSent = false;

  constructor() {}

  ngAfterViewInit() {
    // Configurar el evento de validación del formulario con jQuery
    $('#recoverForm').submit((event) => {
      event.preventDefault(); // Prevenir el comportamiento predeterminado

      // Limpiar mensajes de error
      $('.error-message').text('');

      // Obtener el valor del campo email
      const email = $('#email').val() as string;

      let isValid = true;

      // Validación de email
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        $('#emailError').text('Ingresa un correo electrónico válido.');
        isValid = false;
      }

      // Si la validación es exitosa
      if (isValid) {
        // Mostrar el mensaje de correo enviado
        $('#emailSuccess').text('El correo de recuperación ha sido enviado.');
        this.emailSent = true;
      }
    });
  }
}

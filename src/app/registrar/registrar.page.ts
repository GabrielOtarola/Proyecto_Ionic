import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements AfterViewInit {

  constructor(private router: Router) {}

  ngAfterViewInit() {
    // Permitir solo letras en el campo de nombre de usuario usando expresión regular
    $('#username').on('input', function () {
      const username = $(this).val() as string;
      const regex = /^[A-Za-z]+$/; // Solo letras
      if (!regex.test(username)) {
        $('#usernameError').text('El nombre de usuario solo debe contener letras (sin espacios ni números).');
      } else {
        $('#usernameError').text('');
      }
    });

    // Validación de correo electrónico en tiempo real
    $('#email').on('input', function () {
      const email = $(this).val() as string;
      const emailPattern = /^\S+@\S+\.\S+$/;
      if (!emailPattern.test(email)) {
        $('#emailError').text('Ingresa un correo electrónico válido (ejemplo: usuario@dominio.com).');
      } else {
        $('#emailError').text('');
      }
    });

    // Validación de contraseñas en tiempo real
    $('#password').on('input', function () {
      const password = $('#password').val() as string;
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-zA-Z]{3,})(?=.*\d{4,}).{8,}$/;

      if (!passwordPattern.test(password)) {
        $('#passwordError').text('La contraseña debe tener al menos 1 mayúscula, 3 letras, 4 números, y 8 caracteres.');
      } else {
        $('#passwordError').text('');
      }
    });

    // Validación de edad en tiempo real
    $('#age').on('input', function () {
      const age = Number($(this).val());
      if (isNaN(age) || age < 14 || age > 100) {
        $('#ageError').text('La edad debe estar entre 14 y 100 años.');
      } else {
        $('#ageError').text('');
      }
    });

    // Validación de altura en tiempo real
    $('#height').on('input', function () {
      const height = Number($(this).val());
      if (isNaN(height) || height < 100 || height > 280) {
        $('#heightError').text('La altura debe estar entre 100 cm y 280 cm.');
      } else {
        $('#heightError').text('');
      }
    });

    // Validación de peso en tiempo real
    $('#weight').on('input', function () {
      const weight = Number($(this).val());
      if (isNaN(weight) || weight < 30 || weight > 200) {
        $('#weightError').text('El peso debe estar entre 30 kg y 200 kg.');
      } else {
        $('#weightError').text('');
      }
    });

    // Validación de género
    $('#gender').on('change', function () {
      const gender = $(this).val() as string;
      if (!gender) {
        $('#genderError').text('Selecciona un género.');
      } else {
        $('#genderError').text('');
      }
    });

    // Validación de nivel de actividad
    $('#activityLevel').on('change', function () {
      const activityLevel = $(this).val() as string;
      if (!activityLevel) {
        $('#activityLevelError').text('Selecciona un nivel de actividad.');
      } else {
        $('#activityLevelError').text('');
      }
    });

    // Validación final al enviar el formulario
    $('#registerForm').submit((event) => {
      event.preventDefault(); // Evitar el envío del formulario

      // Limpiar todos los mensajes de error previos
      $('.error-message').text('');

      // Obtener los valores del formulario
      const username = $('#username').val() as string;
      const email = $('#email').val() as string;
      const password = $('#password').val() as string;
      const age = Number($('#age').val());
      const height = Number($('#height').val());
      const weight = Number($('#weight').val());
      const gender = $('#gender').val() as string;
      const activityLevel = $('#activityLevel').val() as string;

      let isValid = true;
      let errorMessages = ''; // Variable para almacenar los mensajes de error

      // Validar nuevamente antes de enviar
      if (!username || !/^[A-Za-z]+$/.test(username)) {
        $('#usernameError').text('El nombre de usuario solo debe contener letras (sin espacios ni números).');
        errorMessages += 'El nombre de usuario no es válido. Debe contener solo letras sin espacios ni números.\n';
        isValid = false;
      }

      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        $('#emailError').text('Ingresa un correo electrónico válido (ejemplo: usuario@dominio.com).');
        errorMessages += 'El correo electrónico no es válido. Debe tener el formato: ejemplo@dominio.com.\n';
        isValid = false;
      }

      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-zA-Z]{3,})(?=.*\d{4,}).{8,}$/;
      if (!password || !passwordPattern.test(password)) {
        $('#passwordError').text('La contraseña debe tener al menos 1 mayúscula, 3 letras, 4 números, y 8 caracteres.');
        errorMessages += 'La contraseña no es válida. Debe contener al menos 1 letra mayúscula, 3 letras y 4 números.\n';
        isValid = false;
      }

      if (!age || isNaN(age) || age < 14 || age > 100) {
        $('#ageError').text('La edad debe estar entre 14 y 100 años.');
        errorMessages += 'La edad debe estar entre 14 y 100 años.\n';
        isValid = false;
      }

      if (!height || isNaN(height) || height < 100 || height > 280) {
        $('#heightError').text('La altura debe estar entre 100 cm y 280 cm.');
        errorMessages += 'La altura no es válida. Debe estar entre 100 cm y 280 cm.\n';
        isValid = false;
      }

      if (!weight || isNaN(weight) || weight < 30 || weight > 200) {
        $('#weightError').text('El peso debe estar entre 30 kg y 200 kg.');
        errorMessages += 'El peso no es válido. Debe estar entre 30 kg y 200 kg.\n';
        isValid = false;
      }

      if (!gender) {
        $('#genderError').text('Selecciona un género.');
        errorMessages += 'No se ha seleccionado un género. Debes elegir uno.\n';
        isValid = false;
      }

      if (!activityLevel) {
        $('#activityLevelError').text('Selecciona un nivel de actividad.');
        errorMessages += 'No se ha seleccionado un nivel de actividad. Debes elegir uno.\n';
        isValid = false;
      }

      // Si todo es válido, redirige al usuario y limpia los datos del formulario
      if (isValid) {
        alert('Registro exitoso');
        console.log('Formulario válido, redirigiendo a login...');
        (document.getElementById('registerForm') as HTMLFormElement).reset();  // Limpiar el formulario
        
        // Redirigir al login pasando el username y password a través de queryParams
        this.router.navigate(['/login'], { queryParams: { username, password } });
      } else {
        alert('Por favor, corrige los siguientes errores antes de continuar:\n' + errorMessages);
        console.log('Errores en el formulario, revise las validaciones.');
      }
    });
  }
}

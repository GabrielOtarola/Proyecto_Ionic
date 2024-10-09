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
        $('#usernameError').text('El nombre de usuario solo debe contener letras.');
      } else {
        $('#usernameError').text('');
      }
    });

    // Validación de correo electrónico en tiempo real
    $('#email').on('input', function () {
      const email = $(this).val() as string;
      const emailPattern = /^\S+@\S+\.\S+$/;
      if (!emailPattern.test(email)) {
        $('#emailError').text('Ingresa un correo electrónico válido.');
      } else {
        $('#emailError').text('');
      }
    });

    // Validación de contraseñas en tiempo real
    $('#password, #confirmPassword').on('input', function () {
      const password = $('#password').val() as string;
      const confirmPassword = $('#confirmPassword').val() as string;
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-zA-Z]{3,})(?=.*\d{4,}).{8,}$/;

      if (!passwordPattern.test(password)) {
        $('#passwordError').text('La contraseña debe tener al menos 1 mayúscula, 3 letras y 4 números.');
      } else {
        $('#passwordError').text('');
      }

      if (password !== confirmPassword) {
        $('#confirmPasswordError').text('Las contraseñas no coinciden.');
      } else {
        $('#confirmPasswordError').text('');
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
      const confirmPassword = $('#confirmPassword').val() as string;
      const age = Number($('#age').val());
      const height = Number($('#height').val());
      const weight = Number($('#weight').val());
      const gender = $('#gender').val() as string;
      const activityLevel = $('#activityLevel').val() as string;

      let isValid = true;

      // Validar nuevamente antes de enviar
      if (!username || !/^[A-Za-z]+$/.test(username)) {
        $('#usernameError').text('El nombre de usuario solo debe contener letras.');
        isValid = false;
      }

      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        $('#emailError').text('Ingresa un correo electrónico válido.');
        isValid = false;
      }

      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-zA-Z]{3,})(?=.*\d{4,}).{8,}$/;
      if (!password || !passwordPattern.test(password)) {
        $('#passwordError').text('La contraseña debe tener al menos 1 mayúscula, 3 letras y 4 números.');
        isValid = false;
      }

      if (password !== confirmPassword) {
        $('#confirmPasswordError').text('Las contraseñas no coinciden.');
        isValid = false;
      }

      if (!age || isNaN(age) || age < 14 || age > 100) {
        $('#ageError').text('La edad debe estar entre 14 y 100 años.');
        isValid = false;
      }

      if (!height || isNaN(height) || height < 100 || height > 280) {
        $('#heightError').text('La altura debe estar entre 100 cm y 280 cm.');
        isValid = false;
      }

      if (!weight || isNaN(weight) || weight < 30 || weight > 200) {
        $('#weightError').text('El peso debe estar entre 30 kg y 200 kg.');
        isValid = false;
      }

      if (!gender) {
        $('#genderError').text('Selecciona un género.');
        isValid = false;
      }

      if (!activityLevel) {
        $('#activityLevelError').text('Selecciona un nivel de actividad.');
        isValid = false;
      }

      // Si todo es válido, redirige al usuario y limpia los datos del formulario
      if (isValid) {
        alert('Registro exitoso');
        (document.getElementById('registerForm') as HTMLFormElement).reset();  // Limpiar el formulario
        this.router.navigate(['/login'], { queryParams: { registered: true } });
      } else {
        alert('Por favor, corrige los errores antes de continuar.');
      }
    });
  }
}


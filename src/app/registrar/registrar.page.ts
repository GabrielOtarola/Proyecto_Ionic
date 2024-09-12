import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { NavegextraService } from '../services/navegextra.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements AfterViewInit {

  constructor(
    private router: Router,
    private navegextraService: NavegextraService // Inyectar el servicio
  ) { }

  ngAfterViewInit() {
    // Permitir solo letras en el campo de nombre de usuario
    $('#username').on('keypress', function (event) {
      const charCode = event.which;
      // Permitir solo letras (mayúsculas y minúsculas) y la tecla de retroceso
      if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && charCode !== 8) {
        event.preventDefault();
        $('#usernameError').text('El nombre de usuario solo debe contener letras.');
      } else {
        $('#usernameError').text(''); // Limpiar el mensaje de error si es válido
      }
    });

    // Validación de nombre de usuario en tiempo real
    $('#username').on('input', function () {
      const username = $(this).val() as string;
      if (username === '') {
        $('#usernameError').text('El nombre de usuario es obligatorio.');
      } else {
        $('#usernameError').text(''); // Limpiar el mensaje si es válido
      }
    });

    // Validación de email en tiempo real
    $('#email').on('input', function () {
      const email = $(this).val() as string;
      const emailPattern = /^\S+@\S+\.\S+$/;
      if (email === '') {
        $('#emailError').text('El correo electrónico es obligatorio.');
      } else if (!emailPattern.test(email)) {
        $('#emailError').text('Ingresa un correo electrónico válido.');
      } else {
        $('#emailError').text(''); // Limpiar el mensaje si es válido
      }
    });

    // Validación de contraseña y confirmación en tiempo real
    $('#password, #confirmPassword').on('input', function () {
      const password = $('#password').val() as string;
      const confirmPassword = $('#confirmPassword').val() as string;
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-zA-Z]{3,})(?=.*\d{4,}).{8,}$/;

      if (password === '') {
        $('#passwordError').text('La contraseña es obligatoria.');
      } else if (!passwordPattern.test(password)) {
        $('#passwordError').text('La contraseña debe tener al menos 1 mayúscula, 3 letras y 4 números.');
      } else {
        $('#passwordError').text('');
      }

      if (confirmPassword === '') {
        $('#confirmPasswordError').text('Debes confirmar la contraseña.');
      } else if (password !== confirmPassword) {
        $('#confirmPasswordError').text('Las contraseñas no coinciden.');
      } else {
        $('#confirmPasswordError').text('');
      }
    });

    // Validación de edad en tiempo real
    $('#age').on('input', function () {
      const age = Number($(this).val());
      if (age === null || isNaN(age)) {
        $('#ageError').text('La edad es obligatoria.');
      } else if (age < 14 || age > 100) {
        $('#ageError').text('La edad debe estar entre 14 y 100 años.');
      } else {
        $('#ageError').text('');
      }
    });

    // Validación de altura en tiempo real
    $('#height').on('input', function () {
      const height = Number($(this).val());
      if (height === null || isNaN(height)) {
        $('#heightError').text('La altura es obligatoria.');
      } else if (height < 100 || height > 280) {
        $('#heightError').text('La altura debe estar entre 100 cm y 280 cm.');
      } else {
        $('#heightError').text('');
      }
    });

    // Validación de peso en tiempo real
    $('#weight').on('input', function () {
      const weight = Number($(this).val());
      if (weight === null || isNaN(weight)) {
        $('#weightError').text('El peso es obligatorio.');
      } else if (weight < 30 || weight > 200) {
        $('#weightError').text('El peso debe estar entre 30 kg y 200 kg.');
      } else {
        $('#weightError').text('');
      }
    });

    // Validación de género y nivel de actividad al seleccionar opciones
    $('#gender, #activityLevel').on('change', function () {
      const gender = $('#gender').val() as string;
      const activityLevel = $('#activityLevel').val() as string;

      if (!gender) {
        $('#genderError').text('Selecciona un género.');
      } else {
        $('#genderError').text('');
      }

      if (!activityLevel) {
        $('#activityLevelError').text('Selecciona un nivel de actividad.');
      } else {
        $('#activityLevelError').text('');
      }
    });

    // Validación completa al enviar el formulario
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

      // Validar nombre de usuario
      if (!username || !/^[a-zA-Z]+$/.test(username)) {
        $('#usernameError').text('El nombre de usuario es obligatorio y solo debe contener letras.');
        isValid = false;
      }

      // Validar email
      if (!email) {
        $('#emailError').text('El correo electrónico es obligatorio.');
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        $('#emailError').text('Ingresa un correo electrónico válido.');
        isValid = false;
      }

      // Validar contraseña
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-zA-Z]{3,})(?=.*\d{4,}).{8,}$/;
      if (!password) {
        $('#passwordError').text('La contraseña es obligatoria.');
        isValid = false;
      } else if (!passwordPattern.test(password)) {
        $('#passwordError').text('La contraseña debe tener al menos 1 mayúscula, 3 letras y 4 números.');
        isValid = false;
      }

      // Validar confirmación de contraseña
      if (!confirmPassword) {
        $('#confirmPasswordError').text('Debes confirmar la contraseña.');
        isValid = false;
      } else if (password !== confirmPassword) {
        $('#confirmPasswordError').text('Las contraseñas no coinciden.');
        isValid = false;
      }

      // Validar edad
      if (!age) {
        $('#ageError').text('La edad es obligatoria.');
        isValid = false;
      } else if (age < 14 || age > 100) {
        $('#ageError').text('La edad debe estar entre 14 y 100 años.');
        isValid = false;
      }

      // Validar altura
      if (!height) {
        $('#heightError').text('La altura es obligatoria.');
        isValid = false;
      } else if (height < 100 || height > 280) {
        $('#heightError').text('La altura debe estar entre 100 cm y 280 cm.');
        isValid = false;
      }

      // Validar peso
      if (!weight) {
        $('#weightError').text('El peso es obligatorio.');
        isValid = false;
      } else if (weight < 30 || weight > 200) {
        $('#weightError').text('El peso debe estar entre 30 kg y 200 kg.');
        isValid = false;
      }

      // Validar género
      if (!gender) {
        $('#genderError').text('Selecciona un género.');
        isValid = false;
      }

      // Validar nivel de actividad
      if (!activityLevel) {
        $('#activityLevelError').text('Selecciona un nivel de actividad.');
        isValid = false;
      }

      // Si todo es válido, registrar al usuario
      if (isValid) {
        const formData = {
          username,
          email,
          password,
          age,
          height,
          weight,
          gender,
          activityLevel,
        };

        // Guardar los datos en NavegextraService
        this.navegextraService.setUserData(formData);

        // Redirigir al login
        this.router.navigate(['/login'], { queryParams: { registered: true } });
      }
    });
  }
}

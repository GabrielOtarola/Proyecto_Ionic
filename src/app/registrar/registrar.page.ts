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
    // Configurar el evento de validación en el formulario
    $('#registerForm').submit((event) => {
      event.preventDefault(); // Evitar el envío del formulario

      // Limpiar mensajes de error
      $('.error-message').text('');

      // Obtener los valores de los campos
      const username = $('#username').val() as string;
      const email = $('#email').val() as string;
      const password = $('#password').val() as string;
      const confirmPassword = $('#confirmPassword').val() as string;
      const age = Number($('#age').val()); // Convertir a número
      const height = Number($('#height').val()); // Convertir a número
      const weight = Number($('#weight').val()); // Convertir a número
      const gender = $('#gender').val() as string;
      const activityLevel = $('#activityLevel').val() as string;

      let isValid = true;

      // Validación de nombre de usuario
      if (!username || !/^[a-zA-Z]+$/.test(username)) {
        $('#usernameError').text('El nombre de usuario es obligatorio y solo debe contener letras.');
        isValid = false;
      }

      // Validación de email
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        $('#emailError').text('Ingresa un correo electrónico válido.');
        isValid = false;
      }

      // Validación de contraseña (al menos 4 números, 3 caracteres y 1 mayúscula)
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d{4,}).{8,}$/;
      if (!password || !passwordPattern.test(password)) {
        $('#passwordError').text('La contraseña debe contener al menos 4 números, 3 caracteres y 1 mayúscula.');
        isValid = false;
      }

      // Validación de confirmación de contraseña
      if (password !== confirmPassword) {
        $('#confirmPasswordError').text('Las contraseñas no coinciden.');
        isValid = false;
      }

      // Validación de edad
      if (!age || age < 14 || age > 100) {
        $('#ageError').text('La edad debe estar entre 14 y 100 años.');
        isValid = false;
      }

      // Validación de altura
      if (!height || height < 100 || height > 280) {
        $('#heightError').text('La altura debe estar entre 100 cm y 280 cm.');
        isValid = false;
      }

      // Validación de peso
      if (!weight || weight < 30 || weight > 200) {
        $('#weightError').text('El peso debe estar entre 30 kg y 200 kg.');
        isValid = false;
      }

      // Validación de género
      if (!gender) {
        $('#genderError').text('Selecciona un género.');
        isValid = false;
      }

      // Validación de nivel de actividad
      if (!activityLevel) {
        $('#activityLevelError').text('Selecciona un nivel de actividad.');
        isValid = false;
      }

      // Si todo es válido, procede a registrar
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

        // Guardar datos del usuario en NavegextraService
        this.navegextraService.setUserData(formData);

        // Redirigir al login después del registro
        this.router.navigate(['/login'], { queryParams: { registered: true } });
      }
    });
  }
}

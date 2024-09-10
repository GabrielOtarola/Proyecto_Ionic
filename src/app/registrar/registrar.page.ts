import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;  // Asegúrate de que jQuery esté disponible

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements AfterViewInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordMatchValidator]],
      confirmPassword: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      height: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      weight: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      gender: ['', Validators.required],
      activityLevel: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  ngAfterViewInit() {
    // Añadir eventos de entrada a cada campo
    $('#username').on('input', () => this.validateUsername());
    $('#email').on('input', () => this.validateEmailField());
    $('#password').on('input', () => this.validatePassword());
    $('#confirmPassword').on('input', () => this.validateConfirmPassword());
    $('#age').on('input', () => this.validateAge());
    $('#height').on('input', () => this.validateHeight());
    $('#weight').on('input', () => this.validateWeight());
    $('#gender').on('ionChange', () => this.validateGender());
    $('#activityLevel').on('ionChange', () => this.validateActivityLevel());

    // Validar al hacer clic en el botón Registrarse
    $('#submitButton').on('click', () => this.validateForm());
  }

  validateUsername() {
    const username = $('#username').val().trim();
    if (username === '') {
      $('#username-error').text('El nombre de usuario es requerido.').show();
    } else if (!/^[a-zA-Z]+$/.test(username)) {
      $('#username-error').text('El nombre de usuario solo debe contener letras.').show();
    } else {
      $('#username-error').hide();
    }
  }

  validateEmailField() {
    const email = $('#email').val().trim();
    if (email === '') {
      $('#email-error').text('El correo electrónico es requerido.').show();
    } else if (!this.validateEmail(email)) {
      $('#email-error').text('Introduce un correo electrónico válido.').show();
    } else {
      $('#email-error').hide();
    }
  }

  validatePassword() {
    const password = $('#password').val().trim();
    if (password === '') {
      $('#password-error').text('La contraseña es requerida.').show();
    } else if (!this.validatePasswordFormat(password)) {
      $('#password-error').text('La contraseña debe contener al menos 4 números, 3 letras y 1 mayúscula.').show();
    } else {
      $('#password-error').hide();
    }
  }

  validateConfirmPassword() {
    const confirmPassword = $('#confirmPassword').val().trim();
    const password = $('#password').val().trim();
    if (confirmPassword === '') {
      $('#confirmPassword-error').text('La confirmación de contraseña es requerida.').show();
    } else if (confirmPassword !== password) {
      $('#confirmPassword-error').text('Las contraseñas no coinciden.').show();
    } else {
      $('#confirmPassword-error').hide();
    }
  }

  validateAge() {
    const age = $('#age').val().trim();
    if (age === '') {
      $('#age-error').text('La edad es requerida.').show();
    } else {
      $('#age-error').hide();
    }
  }

  validateHeight() {
    const height = $('#height').val().trim();
    if (height === '') {
      $('#height-error').text('La altura es requerida.').show();
    } else {
      $('#height-error').hide();
    }
  }

  validateWeight() {
    const weight = $('#weight').val().trim();
    if (weight === '') {
      $('#weight-error').text('El peso es requerido.').show();
    } else {
      $('#weight-error').hide();
    }
  }

  validateGender() {
    const gender = $('#gender').val().trim();
    if (gender === '') {
      $('#gender-error').text('Selecciona un género.').show();
    } else {
      $('#gender-error').hide();
    }
  }

  validateActivityLevel() {
    const activityLevel = $('#activityLevel').val().trim();
    if (activityLevel === '') {
      $('#activityLevel-error').text('Selecciona el nivel de actividad.').show();
    } else {
      $('#activityLevel-error').hide();
    }
  }

  validateForm() {
    this.validateUsername();
    this.validateEmailField();
    this.validatePassword();
    this.validateConfirmPassword();
    this.validateAge();
    this.validateHeight();
    this.validateWeight();
    this.validateGender();
    this.validateActivityLevel();

    // Si todos los mensajes de error están ocultos, el formulario es válido
    if ($('.error-message:visible').length === 0) {
      this.onSubmit();
    } else {
      console.log('Formulario inválido');
    }
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  validatePasswordFormat(password: string): boolean {
    const hasFourDigits = (password.match(/\d/g) || []).length >= 4;
    const hasThreeLetters = (password.match(/[a-zA-Z]/g) || []).length >= 3;
    const hasOneUpperCase = /[A-Z]/.test(password);
    const isValidLength = password.length >= 8;

    return hasFourDigits && hasThreeLetters && hasOneUpperCase && isValidLength;
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.get('password')?.value === frm.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const username = this.registerForm.get('username')?.value;
      this.router.navigate(['/login'], { queryParams: { welcome: username } });
    } else {
      console.log('Formulario inválido');
      console.log(this.registerForm.errors);
    }
  }
}

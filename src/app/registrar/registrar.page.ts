import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements AfterViewInit {
  registerForm: FormGroup;
  submitted = false;  // Para verificar si se ha intentado enviar el formulario

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),  // Al menos 8 caracteres
        Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]{4,})(?=.*[!@#\\$%\\^&\\*]{3,}).*$')  // 4 números, 3 caracteres especiales, 1 mayúscula
      ]],
      confirmPassword: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(14), Validators.max(100), Validators.pattern('^[0-9]+$')]],  // Edad entre 14 y 100 años
      height: ['', [Validators.required, Validators.min(100), Validators.max(280), Validators.pattern('^[0-9]+$')]],  // Altura entre 100 y 280 cm
      weight: ['', [Validators.required, Validators.min(30), Validators.max(200), Validators.pattern('^[0-9]+$')]],  // Peso entre 30 y 200 kg
      gender: ['', Validators.required],
      activityLevel: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  ngAfterViewInit() {
    // Añadir eventos de validación de jQuery, como antes
  }

  // Verifica si las contraseñas coinciden
  passwordMatchValidator(frm: FormGroup) {
    return frm.get('password')?.value === frm.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  // Función para manejar el envío del formulario
  onSubmit() {
    this.submitted = true;  // Se intenta enviar el formulario
    if (this.registerForm.valid) {
      const username = this.registerForm.get('username')?.value;
      this.router.navigate(['/login'], { queryParams: { welcome: username } });
    } else {
      console.log('Formulario inválido');
    }
  }

  // Función de conveniencia para obtener los controles del formulario y mostrar errores
  get f() { return this.registerForm.controls; }
}

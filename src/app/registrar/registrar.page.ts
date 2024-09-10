import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavegextraService } from '../services/navegextra.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements AfterViewInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private navegextraService: NavegextraService  // Inyectar el servicio
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]{4,})(?=.*[!@#\\$%\\^&\\*]{3,}).*$')
      ]],
      confirmPassword: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(14), Validators.max(100), Validators.pattern('^[0-9]+$')]],
      height: ['', [Validators.required, Validators.min(100), Validators.max(280), Validators.pattern('^[0-9]+$')]],
      weight: ['', [Validators.required, Validators.min(30), Validators.max(200), Validators.pattern('^[0-9]+$')]],
      gender: ['', Validators.required],
      activityLevel: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  ngAfterViewInit() {}

  // Verifica si las contraseñas coinciden
  passwordMatchValidator(frm: FormGroup) {
    return frm.get('password')?.value === frm.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  // Manejo del formulario de registro
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // Guardar datos del usuario en NavegextraService
      this.navegextraService.setUserData(formData);

      // Redirigir al login después del registro
      this.router.navigate(['/login'], { queryParams: { registered: true } });
    } else {
      console.log('Formulario inválido');
    }
  }

  get f() { return this.registerForm.controls; }
}

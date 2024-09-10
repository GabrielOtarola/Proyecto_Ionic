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

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      age: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      height: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      weight: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      gender: ['', Validators.required],
      activityLevel: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  ngAfterViewInit() {
    // Añadir eventos de validación de jQuery, como antes
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
    }
  }
}

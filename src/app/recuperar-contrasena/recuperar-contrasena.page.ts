import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage {
  recoverForm: FormGroup;
  submitted = false;
  emailSent = false;

  constructor(private fb: FormBuilder) {
    // Inicializar el formulario reactivo
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Acceso conveniente a los controles del formulario
  get f() {
    return this.recoverForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.recoverForm.valid) {
      // Lógica para manejar el envío de recuperación de contraseña
      // Aquí puedes implementar una simulación de envío o simplemente mostrar el mensaje
      this.emailSent = true;
    }
  }
}

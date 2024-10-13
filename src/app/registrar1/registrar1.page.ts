import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-registrar1',
  templateUrl: './registrar1.page.html',
  styleUrls: ['./registrar1.page.scss'],
})
export class Registrar1Page implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Crear el formulario reactivo con validaciones
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*\\d{4,}).+$')
      ]],
      age: ['', [Validators.required, Validators.min(14), Validators.max(100)]],
      height: ['', [Validators.required, Validators.min(100), Validators.max(280)]],
      weight: ['', [Validators.required, Validators.min(30), Validators.max(200)]],
      gender: ['', Validators.required],
      activityLevel: ['', Validators.required]
    });

    // Inicializar el almacenamiento
    this.storage.create();
  }

  // Volver al login
  handleBackButton() {
    this.navCtrl.navigateBack('/login1');
  }

  // Validar si el campo es inválido
  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  // Obtener el mensaje de error de validación
  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (control?.hasError('pattern')) {
      if (field === 'username') return 'Solo se permiten letras y números.';
      if (field === 'password') return 'La contraseña debe tener al menos 1 mayúscula, 3 letras y 4 números.';
    }
    if (control?.hasError('email')) {
      return 'Ingrese un correo válido.';
    }
    if (control?.hasError('min')) {
      return `El valor mínimo es ${control.errors?.['min'].min}`;
    }
    if (control?.hasError('max')) {
      return `El valor máximo es ${control.errors?.['max'].max}`;
    }
    return '';
  }

  // Enviar el formulario y guardar los datos
  async onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      // Guardar los datos en el localStorage (o en Storage si prefieres)
      localStorage.setItem('username', formData.username);
      localStorage.setItem('password', formData.password);
      await this.storage.set('session_user', formData.username);

      alert('Usuario registrado con éxito.');
      // Redirigir al login
      this.navCtrl.navigateForward('/login1');
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }
}

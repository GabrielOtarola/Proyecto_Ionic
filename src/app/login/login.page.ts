import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { NavegextraService } from '../services/navegextra.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private navegextraService: NavegextraService  // Inyectar el servicio
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // Verificación de credenciales al enviar el formulario
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const storedUser = this.navegextraService.getUserData();

      // Verificación de los datos almacenados en NavegextraService
      if (storedUser && storedUser.username === username && storedUser.password === password) {
        this.navCtrl.navigateForward(`/home?username=${username}`);
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    } else {
      this.errorMessage = 'Formulario inválido';
    }
  }
}

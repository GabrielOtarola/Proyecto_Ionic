import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username } = this.loginForm.value;

      // Aquí va la lógica de autenticación (si aplica)
      // Redirigir a la página de inicio después de autenticarse
      this.navCtrl.navigateForward(`/home?username=${username}`);
    } else {
      console.log('Formulario inválido');
    }
  }
}

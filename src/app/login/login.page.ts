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

      // Aquí debes realizar la lógica de autenticación
      // Supongamos que la autenticación es exitosa

      localStorage.setItem('username', username); // Guardar el nombre de usuario en el almacenamiento local
      this.navCtrl.navigateForward('/home');
    } else {
      console.log('Formulario inválido');
    }
  }
}

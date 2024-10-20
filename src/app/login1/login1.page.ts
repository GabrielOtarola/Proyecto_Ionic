import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.page.html',
  styleUrls: ['./login1.page.scss'],
})
export class Login1Page implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private dbService: DatabaseService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.dbService.initDB().then(() => {
      console.log('Base de datos inicializada.');
    }).catch(error => {
      console.error('Error inicializando la base de datos', error);
    });
  }

  async onSubmit() {
    const { username, password } = this.loginForm.value;
    const user = await this.dbService.getUser(username, password);
    if (user) {
      alert('Inicio de sesión exitoso.');
      localStorage.setItem('username', username);
      this.navCtrl.navigateForward('/home');
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.errors?.['required']) {
      return 'Este campo es obligatorio';
    }
    return '';
  }

  // Método agregado para evitar error en el HTML
  loginWithGoogle() {
    console.log('Login con Google no implementado todavía.');
  }
}

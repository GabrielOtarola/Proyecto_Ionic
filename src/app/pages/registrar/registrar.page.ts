import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método para manejar el botón de retroceso
  handleBackButton() {
    this.navCtrl.back();  // Vuelve a la página anterior
  }

  // Método para registrar el usuario
  onSubmit() {
    if (this.registerForm.valid) {
      this.usuariosService.createUsuario(this.registerForm.value).subscribe(() => {
        alert('Usuario registrado con éxito');
        this.navCtrl.navigateForward('/usuarios');
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  editForm!: FormGroup;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {
    // Obtener el ID del usuario de los parámetros de la ruta
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userId = id ? +id : 0; // Asegurar que sea un número
  }

  ngOnInit() {
    // Inicializar el formulario reactivo
    this.editForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    // Cargar los datos del usuario a editar
    this.loadUsuario();
  }

  // Cargar los datos del usuario desde el servicio
  loadUsuario() {
    this.usuariosService.getUsuario(this.userId).subscribe(data => {
      this.editForm.patchValue(data); // Llenar el formulario con los datos existentes
    });
  }

  // Método para actualizar los datos del usuario
  onSubmit() {
    if (this.editForm.valid) {
      this.usuariosService.updateUsuario(this.userId, this.editForm.value).subscribe(() => {
        alert('Usuario actualizado con éxito');
        this.navCtrl.navigateForward('/usuarios'); // Redirigir a la lista de usuarios
      });
    }
  }

  // Método para eliminar el usuario
  onDelete() {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmDelete) {
      this.usuariosService.deleteUsuario(this.userId).subscribe(() => {
        alert('Usuario eliminado con éxito');
        this.navCtrl.navigateForward('/usuarios'); // Redirigir a la lista de usuarios
      });
    }
  }
}


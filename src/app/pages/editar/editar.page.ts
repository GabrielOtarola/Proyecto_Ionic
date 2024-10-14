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
  userId!: string;  // El ID será de tipo string porque en json-server el ID es alfanumérico

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,  
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Obtiene el ID del usuario desde la URL como string
    this.userId = this.activatedRoute.snapshot.paramMap.get('id')!;

    // Crear el formulario reactivo
    this.editForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Cargar los datos del usuario
    this.loadUsuario();
  }

  // Cargar los datos del usuario por ID
  loadUsuario() {
    this.usuariosService.getUsuario(this.userId).subscribe(
      (data) => {
        if (data) {
          this.editForm.patchValue({
            nombre: data.nombre,
            email: data.email,
            password: data.password || ''  // Si no tiene contraseña, dejar vacío
          });
        }
      },
      (error) => {
        console.error('Error al cargar el usuario:', error);
        alert('Error al cargar los datos del usuario.');
      }
    );
  }

  // Actualizar los datos del usuario
  onSubmit() {
    if (this.editForm.valid) {
      // Reestructurar el objeto para que el ID aparezca primero
      const usuarioActualizado = {
        id: this.userId,  // Coloca el ID al principio
        ...this.editForm.value  // Luego el resto de los campos del formulario
      };

      this.usuariosService.updateUsuario(this.userId, usuarioActualizado).subscribe(() => {
        alert('Usuario actualizado con éxito');
        this.navCtrl.navigateForward('/usuarios');
      });
    }
  }

  // Eliminar el usuario
  onDelete() {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuariosService.deleteUsuario(this.userId).subscribe(() => {
        alert('Usuario eliminado con éxito');
        this.navCtrl.navigateForward('/usuarios');
      });
    }
  }
}

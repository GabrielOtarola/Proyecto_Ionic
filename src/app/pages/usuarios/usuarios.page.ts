import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  usuarios: any[] = [];

  constructor(private usuariosService: UsuariosService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadUsuarios();
  }

  // Cargar la lista de usuarios
  loadUsuarios() {
    this.usuariosService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  // Método para manejar el botón de retroceso
  handleBackButton() {
    this.navCtrl.back();  // Vuelve a la página anterior
  }
}


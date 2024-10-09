import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { BienvenidaModalComponent } from '../bienvenida-modal/bienvenida-modal.component'; // Importa el modal

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  welcomeMessage: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute, // Inyecta ActivatedRoute
    private modalController: ModalController // Inyecta ModalController para manejar el modal
  ) {}

  ngOnInit() {
    // Configura el mensaje de bienvenida cuando se inicia la página
    this.setWelcomeMessage();
  }

  async setWelcomeMessage() {
    // Obtiene el parámetro 'username' desde la URL
    this.activatedRoute.queryParams.subscribe(async params => {
      const username = params['username'];

      if (username) {
        this.isLoggedIn = true;
        this.welcomeMessage = `Bienvenido, ${username}`;

        // Llamar al modal de bienvenida después de iniciar sesión
        await this.presentWelcomeModal(username);
      } else {
        this.isLoggedIn = false;
        this.welcomeMessage = 'Bienvenido';
      }
    });
  }

  // Función para mostrar el modal de bienvenida
  async presentWelcomeModal(username: string) {
    const modal = await this.modalController.create({
      component: BienvenidaModalComponent, // Componente del modal
      cssClass: 'my-custom-class', // Clase personalizada para el modal
      componentProps: {
        username: username // Pasar el nombre de usuario al modal
      }
    });
    return await modal.present(); // Presenta el modal
  }

  // Función para cerrar sesión y redirigir al login
  logout() {
    this.isLoggedIn = false; // Establece el estado como no logueado
    this.navCtrl.navigateRoot('/login'); // Redirige a la página de login
  }

  // Función para navegar a la página de login
  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }

  // Función para navegar a la página de rutina de ejercicios
  goToRutinaEjercicios() {
    this.navCtrl.navigateForward('/rutina-ejercicios');
  }

  // Función para navegar a la página de recetas
  goToRecetas() {
    this.navCtrl.navigateForward('/recetas');
  }
}

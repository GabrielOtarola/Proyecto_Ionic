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

  async presentWelcomeModal(username: string) {
    const modal = await this.modalController.create({
      component: BienvenidaModalComponent,
      cssClass: 'my-custom-class', // Si necesitas personalizar el modal
      componentProps: {
        username: username // Pasar el nombre de usuario al modal
      }
    });
    return await modal.present();
  }

  logout() {
    this.isLoggedIn = false;
    this.navCtrl.navigateRoot('/login');
  }

  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }

  goToRutinaEjercicios() {
    this.navCtrl.navigateForward('/rutina-ejercicios');
  }

  goToRecetas() {
    this.navCtrl.navigateForward('/recetas');
  }
}

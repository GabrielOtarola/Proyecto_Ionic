import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { BienvenidaModalComponent } from '../bienvenida-modal/bienvenida-modal.component';
<<<<<<< HEAD
import { NotificationService } from '../services/notification.service';
import { Storage } from '@ionic/storage-angular'; // Importar Storage
=======
>>>>>>> parent of 2fa542c (Añadiendo Notification-local (Api Nativa))

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  welcomeMessage: string = '';
  isLoggedIn: boolean = false;
  username: string = ''; // Almacena el nombre del usuario

  constructor(
    private navCtrl: NavController,
<<<<<<< HEAD
    private modalController: ModalController,
    private notificationService: NotificationService,
    private storage: Storage // Añadir Storage
=======
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController
>>>>>>> parent of 2fa542c (Añadiendo Notification-local (Api Nativa))
  ) {}

  ngOnInit() {
    this.setWelcomeMessage();
  }

  async setWelcomeMessage() {
    const user = await this.storage.get('session_user');
    if (user) {
      this.isLoggedIn = true;
      this.username = user.username;
      this.welcomeMessage = `Bienvenido, ${this.username}`;
      await this.presentWelcomeModal(this.username); // Mostrar el modal de bienvenida
    } else {
      this.isLoggedIn = false;
      this.welcomeMessage = 'Bienvenido';
    }
  }

  async presentWelcomeModal(username: string) {
    const modal = await this.modalController.create({
      component: BienvenidaModalComponent,
      cssClass: 'my-custom-class',
      componentProps: { username }
    });
    return await modal.present();
  }

  // Método para navegar a la página de inicio de sesión
  goToLogin() {
    this.navCtrl.navigateForward('/login1');
  }

  async logout() {
    this.isLoggedIn = false;
    await this.storage.remove('session_user'); // Eliminar la sesión del usuario
    this.welcomeMessage = 'Bienvenido';
    this.navCtrl.navigateRoot('/login1'); // Redirigir al usuario a la página de inicio de sesión
  }

  goToRutinaEjercicios() {
    this.navCtrl.navigateForward('/rutina-ejercicios');
  }

  goToRecetas() {
    this.navCtrl.navigateForward('/recetas');
  }
}


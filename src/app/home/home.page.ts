import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'; 
import { BienvenidaModalComponent } from '../bienvenida-modal/bienvenida-modal.component'; 

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
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.setWelcomeMessage();
  }

  async setWelcomeMessage() {
    this.activatedRoute.queryParams.subscribe(async params => {
      const username = params['username'];
      if (username) {
        this.isLoggedIn = true;
        this.welcomeMessage = `Bienvenido, ${username}`;
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
      cssClass: 'my-custom-class',
      componentProps: { username }
    });
    return await modal.present();
  }

  // Agregar este método para solucionar el error
  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }

  logout() {
    this.isLoggedIn = false;
    this.navCtrl.navigateRoot('/login');
  }

  goToRutinaEjercicios() {
    this.navCtrl.navigateForward('/rutina-ejercicios');
  }

  goToRecetas() {
    this.navCtrl.navigateForward('/recetas');
  }
}

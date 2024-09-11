import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute

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
    private activatedRoute: ActivatedRoute // Inyecta ActivatedRoute
  ) {}

  ngOnInit() {
    this.setWelcomeMessage();
  }

  setWelcomeMessage() {
    // Obtiene el parámetro 'username' desde la URL
    this.activatedRoute.queryParams.subscribe(params => {
      const username = params['username'];

      if (username) {
        this.isLoggedIn = true;
        this.welcomeMessage = `Bienvenido, ${username}`;
      } else {
        this.isLoggedIn = false;
        this.welcomeMessage = 'Bienvenido';
      }
    });
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

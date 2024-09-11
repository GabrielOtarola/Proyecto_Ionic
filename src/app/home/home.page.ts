import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  welcomeMessage: string = '';
  isLoggedIn: boolean = false;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.setWelcomeMessage();
  }

  setWelcomeMessage() {
    const queryParams = new URLSearchParams(window.location.search);
    const username = queryParams.get('username');
    
    if (username) {
      this.isLoggedIn = true;
      this.welcomeMessage = `Bienvenido, ${username}`;
    } else {
      this.isLoggedIn = false;
      this.welcomeMessage = 'Bienvenido';
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.navCtrl.navigateRoot('/login');
  }

  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }

  // Función para navegar a la página de rutina de ejercicios
  goToRutinaEjercicios() {
    this.navCtrl.navigateForward('/rutina-ejercicios'); // Ruta a la página de rutina
  }

  // Función para navegar a la página de recetas
  goToRecetas() {
    this.navCtrl.navigateForward('/recetas'); // Ruta a la página de recetas
  }
}


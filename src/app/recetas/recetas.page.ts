import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
})
export class RecetasPage implements OnInit {

  constructor(private navCtrl: NavController) { } // Inyectamos NavController

  ngOnInit() {
  }

  // Función para manejar el botón de retroceso
  handleBackButton() {
    this.navCtrl.navigateBack('/home'); // Navegar a la página de inicio
  }
}


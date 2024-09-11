import { Component, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';

interface Ejercicio {
  nombre: string;
  duracion: number;
}

interface Rutina {
  nombre: string;
  ejercicios: Ejercicio[];
}

@Component({
  selector: 'app-rutina-ejercicios',
  templateUrl: './rutina-ejercicios.page.html',
  styleUrls: ['./rutina-ejercicios.page.scss'],
})
export class RutinaEjerciciosPage implements OnDestroy {
  rutinas: Rutina[] = [
    {
      nombre: 'Rutina de Calentamiento',
      ejercicios: [
        { nombre: 'Calentamiento', duracion: 30 },
        { nombre: 'Estiramiento', duracion: 20 },
      ],
    },
    {
      nombre: 'Rutina de Fuerza',
      ejercicios: [
        { nombre: 'Flexiones', duracion: 45 },
        { nombre: 'Sentadillas', duracion: 60 },
      ],
    },
    {
      nombre: 'Rutina de Cardio',
      ejercicios: [
        { nombre: 'Correr en el lugar', duracion: 60 },
        { nombre: 'Saltos de tijera', duracion: 45 },
      ],
    },
    {
      nombre: 'Rutina de Abdominales',
      ejercicios: [
        { nombre: 'Abdominales cortos', duracion: 40 },
        { nombre: 'Plancha', duracion: 60 },
      ],
    },
    {
      nombre: 'Rutina de Estiramiento',
      ejercicios: [
        { nombre: 'Estiramiento de piernas', duracion: 30 },
        { nombre: 'Estiramiento de brazos', duracion: 30 },
      ],
    },
  ];

  ejercicioActual: Ejercicio | null = null;
  tiempoRestante: number = 0;
  progreso: number = 0;
  temporizador: any;
  rutinaCompletada: boolean = false;
  estaPausada: boolean = false;
  ejercicioIniciado: boolean = false;
  mensajeFinal: string = '';

  constructor(private navCtrl: NavController) {}

  seleccionarRutina(rutina: Rutina) {
    this.ejercicioActual = rutina.ejercicios[0];
    this.tiempoRestante = this.ejercicioActual.duracion;
    this.rutinaCompletada = false;
    this.ejercicioIniciado = false;
    this.estaPausada = false;
    this.mensajeFinal = '';
  }

  iniciarRutina() {
    if (!this.ejercicioActual) return;
    this.ejercicioIniciado = true;
    this.mensajeFinal = '';

    this.temporizador = setInterval(() => {
      if (!this.estaPausada) {
        this.tiempoRestante--;
        this.progreso = (this.ejercicioActual!.duracion - this.tiempoRestante) / this.ejercicioActual!.duracion;

        if (this.tiempoRestante <= 0) {
          clearInterval(this.temporizador);
          this.rutinaCompletada = true;
          this.ejercicioIniciado = false;
          this.mensajeFinal = '¡Ejercicio completado!';
        }
      }
    }, 1000);
  }

  pausarRutina() {
    this.estaPausada = true;
  }

  reanudarRutina() {
    this.estaPausada = false;
  }

  detenerRutina() {
    clearInterval(this.temporizador);
    this.rutinaCompletada = false;
    this.ejercicioIniciado = false;
    this.mensajeFinal = 'Ejercicio incompleto';
    this.ejercicioActual = null;
  }

  volverALista() {
    this.ejercicioActual = null;
    this.rutinaCompletada = false;
    this.ejercicioIniciado = false;
    this.mensajeFinal = '';
  }

  handleBackButton() {
    if (this.ejercicioActual) {
      this.volverALista(); // Si estamos en un ejercicio, volvemos a la lista de rutinas
    } else {
      this.navCtrl.navigateBack('/home'); // Si estamos en la lista de rutinas, volvemos al home
    }
  }

  ngOnDestroy() {
    if (this.temporizador) {
      clearInterval(this.temporizador);
    }
  }
}

import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-rutina-ejercicios',
  templateUrl: './rutina-ejercicios.page.html',
  styleUrls: ['./rutina-ejercicios.page.scss'],
})
export class RutinaEjerciciosPage implements OnDestroy {
  rutinas = [
    { nombre: 'Rutina de Calentamiento', ejercicios: [
        { nombre: 'Calentamiento', duracion: 30 },
        { nombre: 'Estiramiento', duracion: 20 }
      ]
    },
    { nombre: 'Rutina de Fuerza', ejercicios: [
        { nombre: 'Flexiones', duracion: 45 },
        { nombre: 'Sentadillas', duracion: 60 }
      ]
    },
    { nombre: 'Rutina de Cardio', ejercicios: [
        { nombre: 'Correr en el lugar', duracion: 60 },
        { nombre: 'Saltos de tijera', duracion: 45 }
      ]
    },
    { nombre: 'Rutina de Abdominales', ejercicios: [
        { nombre: 'Abdominales cortos', duracion: 40 },
        { nombre: 'Plancha', duracion: 60 }
      ]
    },
    { nombre: 'Rutina de Estiramiento', ejercicios: [
        { nombre: 'Estiramiento de piernas', duracion: 30 },
        { nombre: 'Estiramiento de brazos', duracion: 30 }
      ]
    }
  ];

  ejercicioActual: any = null;
  tiempoRestante: number = 0;
  progreso: number = 0;
  temporizador: any;
  rutinaCompletada: boolean = false;

  seleccionarRutina(rutina: any) {
    if (!rutina || !rutina.ejercicios || rutina.ejercicios.length === 0) return;

    this.ejercicioActual = rutina.ejercicios[0];
    this.rutinaCompletada = false;
    this.tiempoRestante = this.ejercicioActual.duracion;
    this.progreso = 0;
  }

  iniciarRutina() {
    if (!this.ejercicioActual) return;

    let indiceEjercicio = 0;
    const rutina = this.rutinas.find(rutina => rutina.ejercicios.includes(this.ejercicioActual));
    if (!rutina) return;

    this.ejercicioActual = rutina.ejercicios[indiceEjercicio];
    this.tiempoRestante = this.ejercicioActual.duracion;
    this.progreso = 0;
    this.rutinaCompletada = false;

    this.temporizador = setInterval(() => {
      this.tiempoRestante--;
      this.progreso = (this.ejercicioActual.duracion - this.tiempoRestante) / this.ejercicioActual.duracion;

      if (this.tiempoRestante <= 0) {
        indiceEjercicio++;
        if (indiceEjercicio < rutina.ejercicios.length) {
          this.ejercicioActual = rutina.ejercicios[indiceEjercicio];
          this.tiempoRestante = this.ejercicioActual.duracion;
          this.progreso = 0;
        } else {
          clearInterval(this.temporizador);
          this.ejercicioActual = null;
          this.tiempoRestante = 0;
          this.progreso = 1;
          this.rutinaCompletada = true;
        }
      }
    }, 1000);
  }

  detenerRutina() {
    clearInterval(this.temporizador);
    this.ejercicioActual = null;
    this.tiempoRestante = 0;
    this.progreso = 0;
    this.rutinaCompletada = true;
  }

  volverALista() {
    this.ejercicioActual = null;
    this.rutinaCompletada = false;
  }

  ngOnDestroy() {
    if (this.temporizador) {
      clearInterval(this.temporizador);
    }
  }
}



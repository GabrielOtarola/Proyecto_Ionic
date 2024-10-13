import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular'; // Importar el IonicStorageModule

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importación del módulo de animaciones
import { BienvenidaModalComponent } from './bienvenida-modal/bienvenida-modal.component'; // Importación del componente modal

@NgModule({
  declarations: [AppComponent, BienvenidaModalComponent], // Declaración del componente modal
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule, // Importación del módulo para formularios reactivos
    BrowserAnimationsModule, // Importación del módulo de animaciones
    IonicStorageModule.forRoot(), // Configuración del almacenamiento
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Proveedor de la estrategia de rutas
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

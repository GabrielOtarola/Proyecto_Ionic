import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importación del módulo de animaciones
import { BienvenidaModalComponent } from './bienvenida-modal/bienvenida-modal.component'; // Importación del componente modal

@NgModule({
  declarations: [AppComponent, BienvenidaModalComponent], // Asegúrate de declarar el componente modal
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // Asegúrate de importar BrowserAnimationsModule para las animaciones
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

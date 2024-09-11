import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavegextraService } from './services/navegextra.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';  // Importar el servicio

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NavegextraService, provideAnimationsAsync()],  // Añadir NavegextraService a los proveedores
  bootstrap: [AppComponent],
})
export class AppModule {}

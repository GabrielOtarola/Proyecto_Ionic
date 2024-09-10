import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Asegúrate de importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { RecuperarContrasenaPageRoutingModule } from './recuperar-contrasena-routing.module';

import { RecuperarContrasenaPage } from './recuperar-contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Importar ReactiveFormsModule aquí
    IonicModule,
    RecuperarContrasenaPageRoutingModule
  ],
  declarations: [RecuperarContrasenaPage]
})
export class RecuperarContrasenaPageModule {}

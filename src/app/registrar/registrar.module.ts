import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { RegistrarPageRoutingModule } from './registrar-routing.module';

import { RegistrarPage } from './registrar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Asegúrate de incluir ReactiveFormsModule aquí
    IonicModule,
    RegistrarPageRoutingModule
  ],
  declarations: [RegistrarPage]
})
export class RegistrarPageModule {}

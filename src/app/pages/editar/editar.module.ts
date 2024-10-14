import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegurarse de incluir ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { EditarPageRoutingModule } from './editar-routing.module';
import { EditarPage } from './editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Importar ReactiveFormsModule
    IonicModule,
    EditarPageRoutingModule
  ],
  declarations: [EditarPage]
})
export class EditarPageModule {}


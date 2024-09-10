import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavegextraService {
  private userData: any = null;

  // Almacena los datos del usuario temporalmente
  setUserData(data: any) {
    this.userData = data;
  }

  // Obtiene los datos almacenados
  getUserData() {
    return this.userData;
  }

  // Borra los datos del usuario
  clearUserData() {
    this.userData = null;
  }
}

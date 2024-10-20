import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) {
    this.initStorage(); // Inicializar almacenamiento
  }

  async initStorage() {
    await this.storage.create();
  }

  async canActivate(): Promise<boolean> {
    await this.initStorage(); // Asegura que el almacenamiento esté listo
    const user = await this.storage.get('session_user');
    if (user) {
      return true;
    } else {
      this.router.navigate(['/login1']);
      return false;
    }
  }
}



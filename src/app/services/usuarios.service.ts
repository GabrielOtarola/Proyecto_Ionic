import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/usuarios'; // URL del json-server

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Obtiene todos los usuarios
  }

  // Método que recibe un id y devuelve los datos del usuario con ese id
  getUsuario(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);  // Obtiene un usuario por su ID
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);  // Crea un nuevo usuario
  }

  updateUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario);  // Actualiza un usuario por su ID
  }

  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);  // Elimina un usuario por su ID
  }
}

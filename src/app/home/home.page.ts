import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  welcomeMessage: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.setWelcomeMessage();
  }

  setWelcomeMessage() {
    const username = localStorage.getItem('username');
    this.isLoggedIn = !!username;
    this.welcomeMessage = username ? `Bienvenido, ${username}` : 'Bienvenido';
  }

  logout() {
    localStorage.removeItem('username');
    this.isLoggedIn = false; // Cambiamos el estado de login
    this.welcomeMessage = 'Bienvenido'; // Reseteamos el mensaje de bienvenida
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

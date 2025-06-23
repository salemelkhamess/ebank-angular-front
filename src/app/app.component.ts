import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {LoginService} from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements  OnInit{
  title = 'angular_bank';
  constructor(private  loginService : LoginService) {
  }
  ngOnInit() {
    this.loginService.loadJWTFromLocalStorage()
  }
}

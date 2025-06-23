import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {LoginService} from '../services/login.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  implements  OnInit{

  username! : string
  constructor(protected loginService : LoginService , private router : Router) {
  }


  ngOnInit(): void {
  }


  handleLogout() {
    this.loginService.logout()


  }
}

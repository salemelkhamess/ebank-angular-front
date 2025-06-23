import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit{

  loginFormGroup! : FormGroup
  token! : string
  constructor(private fb:FormBuilder , private loginService : LoginService , private router :Router) {
  }
  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    })
  }

  handleLogin() {
    let username = this.loginFormGroup.value.username;
    let password = this.loginFormGroup.value.password
    this.loginService.login(username,password).subscribe({
      next : value => {
        this.loginService.loadProfile(value)
        this.router.navigateByUrl("/admin")
        console.log(value)
      },
      error : err => {
        console.log(err)
      }
    })
  }
}

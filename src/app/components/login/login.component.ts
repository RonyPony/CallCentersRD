import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor() { }
  title = 'Ingreso';
  loginForm: FormGroup;



  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  async onSubmit(): Promise<void> {
    Swal.fire(
      "Hey !", "Oye, nos alegra tenerte por aquí, pero aun seguimos trabajando, estamos organizando las conexiones para poder brindarte la forma mas fácil de aplicar. Pronto estaremos de vuelta ", "info"
    )
    // console.log(this.loginForm.value)
  }
}

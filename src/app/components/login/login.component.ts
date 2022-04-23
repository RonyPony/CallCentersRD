import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../../app/services/config.service';
import Swal from 'sweetalert2';
import { Toast } from '../../../app/utils/notification.toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private client: HttpClient, private config: ConfigService, private router: Router) { }
  title = 'Ingreso';
  loginForm: FormGroup;


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.client.post<any>(`${this.config.config.apiUrl}/api/users/login`, {
        userEmail: this.loginForm.value.email,
        userPassword: this.loginForm.value.password
      }).subscribe(
        (result) => {
          sessionStorage.clear()
          sessionStorage.setItem('name', result.name);
          sessionStorage.setItem('lastName', result.lastName);
          sessionStorage.setItem('userId', result.id);
          Toast.fire({ icon: 'success', title: `Bienvenido ${result.name} !` });
          this.router.navigate(["dashboard"])
        },
        (err: any) => {
          if (err.status === 401) {
            Swal.fire("Credenciales incorrectas 🧐", "Al parecer las credenciales que nos has dado no son validas, revíselas y trate de nuevo", "warning")
          } else if (err.status === 500) {
            Swal.fire("Ups 😩", "Ha ocurrido un error al tratar de ingresar al sistema !", "error")
          }

          console.log(`Theres an error on the login process: `, err)
        }
      )
    } else {
      if (!this.loginForm.get("email").valid) {
        Swal.fire("Correo electrónico no valido 😑", "Al parecer el correo ingresado no es valido, revise este dato y trate de nuevo", "warning")
      } else if (!this.loginForm.get("password").valid) {
        Swal.fire("Contraseña no valida 😨", "Al parecer no ingresaste tu contraseña, revise este dato y trate de nuevo", "warning")
      }
    }
  }
}

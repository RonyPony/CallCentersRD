import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { Toast } from 'src/app/utils/notification.toast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router, private client: HttpClient, private config: ConfigService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      }
    )
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      this.client.post(`${this.config.config.apiUrl}/api/users/register`, this.registerForm.value).subscribe(
        (result) => {
          Toast.fire({ icon: "success", title: 'Registro satisfactorio' }).then(() => { this.router.navigate(["login"]) })
        },
        (err: any) => {
          if (err.status === 400) {
            if (err.error === 'This email is already registered') {
              Swal.fire("Alto ahi 🚨", "Por lo visto ya estas registrado, en breve te enviare a la pagina de ingreso").then(v => { if (v.isConfirmed) { this.router.navigate(["login"]) } })
            } else {
              Swal.fire("Ups 😩", "Ha ocurrido un error al tratar de registrarte. Intenta de nuevo mas tarde", "error")
            }
          }
          console.log(`Theres an error on the register process: `, err)
        }
      )
    } else {
      if (!this.registerForm.get('email').valid) {
        Swal.fire("Correo electrónico no valido 😑", "Al parecer el correo ingresado no es valido, revise este dato y trate de nuevo", "warning")
      } else if (!this.registerForm.get('password').valid) {
        Swal.fire("Contraseña no valida 😨", "Al parecer no ingresaste tu contraseña, revise este dato y trate de nuevo", "warning")
      } else if (!this.registerForm.get('name').valid) {
        Swal.fire("Nombre invalido 😑", "Por lo visto no tienes nombre, pudieras darme el que tengas ?", "warning")
      } else if (!this.registerForm.get('lastName').valid) {
        Swal.fire("Apellido invalido 😑", "No me has dado tu apellido, serias tan amable de hacerlo ?", "warning")
      }
    }
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast } from '../../../app/utils/notification.toast';
import { ProfileInformation } from '../../../app/interfaces/profile-information.interface';
import { ConfigService } from '../../../app/services/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private config: ConfigService, private client: HttpClient) { }

  info: ProfileInformation =
    {
      id: 0,
      name: "",
      lastName: "",
      email: "",
      password: "",
      registrationDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()

    };

  profileForm = new FormGroup({
    name: new FormControl(this.info.name, Validators.required),
    lastName: new FormControl(this.info.lastName, Validators.required),
    email: new FormControl(this.info.email, [Validators.required, Validators.email]),
    password: new FormControl(this.info.password, Validators.required)
  })

  ngOnInit(): void {
    this.client.get<ProfileInformation>(
      `${this.config.config.apiUrl}/api/users/${sessionStorage.getItem("userId")}`).subscribe(
        (result) => {
          this.info = result;
          this.profileForm.setValue({
            name: this.info.name,
            lastName: this.info.lastName,
            email: this.info.email,
            password: this.info.password
          })
        },
        (err) => {
          if (err.status === 404) {
            Swal.fire("Alto ahi desconocido 🕵️‍♂️", "Tengo la pena de decirle que no le reconozco, no he encontrado datos respecto a usted en el sistema 🥺", "info");
          } else if (err.status === 500) {
            Swal.fire("Ups 😩", "Ha ocurrido un error al tratar de cargar sus datos en el sistema !", "error")
          }
        }
      )
  }


  onSubmit() {
    if (this.profileForm.valid) {
      Object.assign(this.info, this.profileForm.value)
      this.client.put(`${this.config.config.apiUrl}/api/users/${sessionStorage.getItem("userId")}`, this.info).subscribe(
        (result) => {
          debugger;
          sessionStorage.clear()
          sessionStorage.setItem('name', this.info.name);
          sessionStorage.setItem('lastName', this.info.lastName);
          sessionStorage.setItem('userId', String(this.info.id));
          Toast.fire({ icon: 'success', title: `Cambios aplicados !` });
        },
        (err) => {
          debugger;
          if (err.status == 400) {
            Swal.fire("Información incorrecta 🧐", "Al parecer los nuevos datos que nos has dado no son validos, revíselos y trate de nuevo", "warning")
          }
          else if (err.status === 500) {
            Swal.fire("Ups 😩", "Ha ocurrido un error al tratar de guardar sus cambios en el sistema !", "error")
          }
        }
      )
    } else {
      if (!this.profileForm.get("name").valid) {
        Swal.fire("Campo nombre invalido 😑", "Debes de ingresar un nombre valido, no dejarme el campo vació 😠", "error")
      } else if (!this.profileForm.get("lastName").valid) {
        Swal.fire("Campo apellido invalido 😑", "Debes de ingresar un apellido valido, no dejarme el campo vació 😠", "error")
      } else if (!this.profileForm.get("email").valid) {
        Swal.fire("Campo de correo electrónico no valido 😑", "Debes de revisar que el mismo sea un correo con una estructura valida, y no dejarme el campo vació 🥺", "error")
      } else if (!this.profileForm.get("password").valid) {
        Swal.fire("Campo de contraseña no valido 😑", "Si no vas a cambiar tu contraseña por favor actualiza la pagina o introducirla de nuevo tal y como es 🥺", "error")
      }
    }
  }

}

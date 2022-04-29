import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileInformation } from 'src/app/interfaces/profile-information.interface';
import { ConfigService } from 'src/app/services/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users:ProfileInformation[]=[];
  constructor(private http:HttpClient, private config:ConfigService,private router:Router) { }


  ngOnInit(): void {
    var userId = sessionStorage.getItem("userId")
    this.http.get<ProfileInformation[]>(
      `${this.config.config.apiUrl}/api/users`).subscribe(
        (result) => {
          console.log("result>",result)
          
          this.users = result;
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


  


}

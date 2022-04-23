import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exportdata',
  templateUrl: './exportdata.component.html',
  styleUrls: ['./exportdata.component.css']
})
export class ExportdataComponent implements OnInit {

  constructor(private router: Router,private http:HttpClient,private config: ConfigService) { }

  ngOnInit(): void {
  }

  export(){
    console.log("Exportando ...")
    window.location.replace(`${this.config.config.apiUrl}/api/export`)
    // this.http.get(
    //   `${this.config.config.apiUrl}/api/export`).subscribe(
    //     (result) => {
    //       console.log(result)
          
    //     },
    //     (err) => {
    //       if (err.status === 404) {
    //         Swal.fire("Alto ahi desconocido 🕵️‍♂️", "Tengo la pena de decirle que no le reconozco, no he encontrado datos respecto a usted en el sistema 🥺", "info");
    //       } else if (err.status === 500) {
    //         Swal.fire("Ups 😩", "Ha ocurrido un error al tratar de cargar sus datos en el sistema !", "error")
    //       }
    //     }
    //   )
  }

}

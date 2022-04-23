import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileInformation } from 'src/app/interfaces/profile-information.interface';
import { ResponseInformation } from 'src/app/interfaces/question-information.interface';
import { ConfigService } from 'src/app/services/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  responses: ResponseInformation[] = [];
  constructor(private config: ConfigService,private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ResponseInformation[]>(
      `${this.config.config.apiUrl}/api/responses/byUserId/${sessionStorage.getItem("userId")}`).subscribe(
        (result) => {
          this.responses = result;
          
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

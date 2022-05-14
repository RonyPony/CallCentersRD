import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  hasUserCompletedQuestions=false;
  constructor(private router:Router,private config: ConfigService,private http: HttpClient) { }

  ngOnInit(): void {
    var userId = sessionStorage.getItem("userId")
    this.hasCompletedAllQuestions(userId);
    this.http.get<ResponseInformation[]>(
      `${this.config.config.apiUrl}/api/responses/byUserId/${userId}`).subscribe(
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

  goQuestions(){
    this.router.navigate(["dashboard"])
  }
  goWhatsapp(){
    window.location.href="https://wa.me/message/ILIESYFKIPVYE1";
  }

  hasCompletedAllQuestions(userId: string) {
    this.http.get<boolean>(`${this.config.config.apiUrl}/api/responses/hasUserCompletedQuestions/` + userId).subscribe(
      (result) => {
        console.log("hasUserCompletedQuestions>",result)
        this.hasUserCompletedQuestions=result
      },
      (error) => {
        if (error.status >= 500) {
          Swal.fire("Ups 😩", "Se ha producido un error al tratar de obtener los datos del servidor. Trate nuevamente mas tarde", "error");
        }
      }
    )
  }

}

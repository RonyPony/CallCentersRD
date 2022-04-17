import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import Swal from 'sweetalert2';
import { QuestionInformation, ResponseInformation } from '../../interfaces/question-information.interface'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question: QuestionInformation = {
    question: '',
    creationDate: new Date(),
    enable: false
  };
  userId: number;

  questionForm: FormGroup;

  response: ResponseInformation;

  constructor(private client: HttpClient, private config: ConfigService, private router: Router) { }

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem('userId'));
    this.client.get<{
      id: number,
      pregunta: string,
      creationDate: Date,
      enable: boolean
    }>(`${this.config.config.apiUrl}/api/preguntas/oneQuestion`, { params: { userId: sessionStorage.getItem("userId") } }).subscribe(
      (r) => {
        if (r) {
          this.question = {
            id: r.id,
            question: r.pregunta,
            creationDate: r.creationDate,
            enable: r.enable
          }
        } else {
          Swal.fire("Oh 😅", "Al parecer no tienes mas preguntas que responder. Te enviare a la pagina principal", "info").then(() => this.router.navigate(['']))
        }
      },
      (err) => {
        if (err.status === 400) {
          Swal.fire("Ups 😩", "Ha ocurrido un error al tratar de cargar las preguntas del servidor. Intenta de nuevo mas tarde", "error")
        }
      }
    )

    this.response = {
      questionId: this.question.id,
      userId: this.userId,
      responseContent: null
    }

    this.questionForm = new FormGroup({
      response: new FormControl(this.response.responseContent, Validators.required)
    })
  }

  async onSubmit() {
    this.client.post(`${this.config.config.apiUrl}/api/responses`, this.response).subscribe(
      (result) => {
        this.router.navigate(["blank"])
      },
      (err) => {
        if (err.status >= 400 && err.status <= 500) {
          Swal.fire("Ups 😩", "Ha ocurrido un error al tratar de enviar esta pregunta al servidor. Intenta de nuevo mas tarde", "error")
        } else {
          Swal.fire("Ups 😩", "Ha ocurrido un error al tratar de cargar las preguntas del servidor. Contacte al administrador", "error")
        }
      }
    )
  }
}

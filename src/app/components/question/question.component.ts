import { HttpClient } from "@angular/common/http";
import {
  Component,
  OnInit,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/services/config.service";
import Swal from "sweetalert2";
import {
  QuestionInformation,
  ResponseInformation,
} from "../../interfaces/question-information.interface";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent implements OnInit {
  questionForm = new FormGroup({
    respuesta: new FormControl("", Validators.required),
  });
  positiveMessages = ["Muy bien, sigue asi!", "Ya casi terminamos, continua!"];
  question: QuestionInformation = {
    question: "",
    creationDate: new Date(),
    enable: false,
  };
  userId: number;
  questionNumber: number = 0;
  totalQuestions: number = 0;

  response: ResponseInformation;

  constructor(
    private client: HttpClient,
    private config: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem("userId"));
    this.loadCounters();
    this.client
      .get<{
        id: number;
        pregunta: string;
        creationDate: Date;
        enable: boolean;
      }>(`${this.config.config.apiUrl}/api/preguntas/oneQuestion`, {
        params: { userId: sessionStorage.getItem("userId") },
      })
      .subscribe(
        (r) => {
          if (r && this.questionNumber <= this.totalQuestions) {
            this.question = {
              id: r.id,
              question: r.pregunta,
              creationDate: r.creationDate,
              enable: r.enable,
            };
          } else {
            Swal.fire(
              "Oh 😅",
              "Al parecer no tienes mas preguntas que responder. Te enviare a la pagina principal",
              "info"
            ).then(() => this.router.navigate([""]));
          }
        },
        (err) => {
          if (err.status === 400) {
            Swal.fire(
              "Ups 😩",
              "Ha ocurrido un error al tratar de cargar las preguntas del servidor. Intenta de nuevo mas tarde",
              "error"
            );
          }
        }
      );

    this.response = {
      questionId: this.question.id,
      userId: this.userId,
      responseContent: null,
    };

    // console.log(this.response)
  }
  loadCounters() {
    this.client.get<{
      answeredQuestions: number;
      notAnsweredQuestions: number;
    }>(`${this.config.config.apiUrl}/api/responses/responseCounter`, {
      params: { userId: sessionStorage.getItem("userId") },
    })
      .subscribe((response) => {
        this.totalQuestions = response.answeredQuestions + response.notAnsweredQuestions;
        this.questionNumber = response.answeredQuestions;
      })
  }

  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  async onSubmit() {
    this.response.questionId = this.question.id;
    this.response.responseContent = this.questionForm.get("respuesta")?.value;

    console.log(this.response);

    this.client
      .post(`${this.config.config.apiUrl}/api/responses`, this.response)
      .subscribe(
        (result) => {
          // this.router.navigate(["dashboard"]);
          var msg =
            this.positiveMessages[
            Math.floor(Math.random() * this.positiveMessages.length)
            ];

          // console.log(Toast.fire({ icon: "success", title: msg }));

          location.reload();
          // this.sleep(2000);
          // this.router.navigate(["dashboard"]);
        },
        (err) => {
          if (err.status === 401) {
            Swal.fire(
              "Un Momento 🚨",
              "Has completado todas las preguntas que debías de responder, Te enviare a la pantalla principal en breve 😉",
              "warning"
            ).then(() => { this.router.navigate(["dashboard"]) })
          }
          else if (err.status >= 402 && err.status <= 500) {
            Swal.fire(
              "Ups 😩",
              "Ha ocurrido un error al tratar de enviar esta pregunta al servidor. Intenta de nuevo mas tarde",
              "error"
            );
          } else {
            Swal.fire(
              "Ups 😩",
              "Ha ocurrido un error al tratar de cargar las preguntas del servidor. Contacte al administrador",
              "error"
            );
          }
        }
      );
  }
}

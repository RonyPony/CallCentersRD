import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../app/services/config.service';
import { QuestionInformation } from '../../../app/interfaces/question-information.interface';
import Swal from 'sweetalert2';
import { NgLocalization } from '@angular/common';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private client: HttpClient, private config: ConfigService) { }

  questions: Array<QuestionInformation> = new Array<QuestionInformation>();

  headElements = ['ID', 'Pregunta', 'Fecha de Creación', 'Esta Vigente', 'Opciones'];

  ngOnInit(): void {
    
  
    this.client.get<Array<{
      id: number;
      pregunta: string;
      creationDate: Date;
      enable: boolean;
    }>>(`${this.config.config.apiUrl}/api/preguntas`).subscribe(
      (result) => {
        this.questions = result.map(r => {
          return {
            id: r.id,
            question: r.pregunta,
            creationDate: r.creationDate,
            enable: r.enable,
          }
        })
      },
      (error) => {
        if (error.status >= 500) {
          Swal.fire("Ups 😩", "Se ha producido un error al tratar de obtener los datos del servidor. Trate nuevamente mas tarde", "error");
        }
      }
    )
  }

  async showToast(id: number) {
    let q = this.questions.filter((q) => q.id === id)[0]

    let qq = {
      id: q.id,
      pregunta: q.question,
      creationDate: q.creationDate,
      enable: q.enable
    }

    const { value } = await Swal.fire({
      title: 'Modifique su pregunta',
      input: 'text',
      inputLabel: 'Pregunta',
      inputValue: q.question,
      showCancelButton: true,
      
      inputValidator: (value) => {
        if (!value) {
          return 'No puedes dejar el campo vació !'
        }
      }
    })

    if (value) {
      debugger;
      qq.pregunta = value;
      this.client.put(`${this.config.config.apiUrl}/api/preguntas/${String(id)}`, qq).subscribe(
        (result) => {
          debugger;
          Swal.fire("Eureka 🥳", "La pregunta se ha modificado con éxito 💪", "info").then(() => { location.reload(); })
        },
        (error) => {
          debugger;
          if (error.status >= 500) {
            Swal.fire("Ups 😩", "Se ha producido un error al tratar de actualizar la pregunta solicitada. Trate de nuevo mas tarde", "error")
          }
        }
      )
    }
  }

  async deactivate(id:number){
    this.client.post(`${this.config.config.apiUrl}/api/preguntas/disable/${String(id)}`,'').subscribe(
      (response)=>{
        Swal.fire("Hurra 🥳", "La pregunta se ha desactivada con éxito 💪", "info").then(()=>{location.reload()})
      }
    )
  }


  async activate(id:number){
    // this.client.post(`${this.config.config.apiUrl}/api/preguntas/enable/${String(id)}`,'').subscribe(
    //   (response)=>{
    //     Swal.fire("Hurra 🥳", "La pregunta se ha activado con éxito 💪", "info")
    //   }
    // )

    this.client.post(`${this.config.config.apiUrl}/api/preguntas/enable/${String(id)}`,{ responseType: 'text' }).subscribe(data => {
      Swal.fire("Hurra 🥳", "La pregunta se ha activado con éxito 💪", "info").then(()=>{location.reload()})
  })
  }

  async deleteQuestion(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Seguro que desea eliminar esta pregunta',
      text: "Una vez hecho esto no podrás volver atrás!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si 🔥!',
      cancelButtonText: 'No, cancela ⚡!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.client.delete(`${this.config.config.apiUrl}/api/preguntas/${String(id)}`).subscribe(
          (result) => {
            swalWithBootstrapButtons.fire(
              'Eliminado 🗑️!',
              'Esta pregunta a sido eliminada.',
              'success'
            ).then(() => { location.reload(); })
          },
          (error) => {
            if (error.status === 404) {
              swalWithBootstrapButtons.fire(
                'Alto ahi',
                'Esta pregunta no existe en el sistema',
                'warning'
              )
            } else if (error.status >= 500) {
              swalWithBootstrapButtons.fire(
                'Ups',
                'Esta pregunta no ha podido ser eliminada. Trate de nuevo mas tarde',
                'error'
              )
            }
          }
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cacelado',
          'Esta pregunta se encuentra a salvo',
          'info'
        )
      }
    })
  }

  async generateNew() {
    let q = {
      pregunta: "",
      enable: true
    }

    const { value } = await Swal.fire({
      title: 'Ingrese la nueva pregunta',
      input: 'text',
      inputLabel: 'Pregunta',
      inputValue: q.pregunta,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'No puedes dejar el campo vació !'
        }
      }
    })

    if (value) {
      q.pregunta = value;
      this.client.post(`${this.config.config.apiUrl}/api/preguntas`, q).subscribe(
        (result) => {
          debugger;
          Swal.fire("Eureka 🥳", "La pregunta se ha agregado con éxito 💪", "info").then(() => { location.reload(); })
        },
        (error) => {
          debugger;
          if (error.status >= 500) {
            Swal.fire("Ups 😩", "Se ha producido un error al tratar de crear la pregunta solicitada. Trate de nuevo mas tarde", "error")
          }
        }
      )
    }
  }
}


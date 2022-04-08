import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  go(){
    Swal.fire(
      "Hey !","Oye, nos alegra tenerte por aqui, pero aun seguimos trabajando, estamos organizando las conexiones para poder brindarte la forma mas facil de aplicar. Pronto estaremos de vuelta ","info"
    )
  }

}

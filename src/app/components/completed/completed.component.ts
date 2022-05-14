import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goAnswers(){
    this.router.navigate(["answers"])
  }

  goWhatsapp(){
    window.location.href="https://wa.me/message/ILIESYFKIPVYE1";
  }

}

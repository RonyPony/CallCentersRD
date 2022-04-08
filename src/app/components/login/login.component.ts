import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor() { }
  title = 'Ingreso';
  loginForm: FormGroup;

  

  ngOnInit(): void {
    // this.loginForm = new FormGroup({
    //   username: new FormControl(),
    //   password: new FormControl()
    // })
  }

  async onSubmit(): Promise<void> {
    // console.log(this.loginForm.value)
  }
}

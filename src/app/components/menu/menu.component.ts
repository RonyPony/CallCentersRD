import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/services/config.service";
import { Toast } from "src/app/utils/notification.toast";
import Swal from "sweetalert2";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router,private client:HttpClient,private config:ConfigService) {}
  isAdmin = false;
  ngOnInit(): void {
    var userId = sessionStorage.getItem('userId');
    this.client.get<boolean>(`${this.config.config.apiUrl}/api/users/`+userId+`/isAdmin`).subscribe(
      (result) => {
        this.isAdmin = result
        console.log("is admin user >",result)
      },
      (err: any) => {
        Swal.fire("Ups 😩", "Ha ocurrido un error al validar tus roles en el sistema !", "error")

        console.log(`Theres an error on the login process: `, err)
      }
    )
  }

  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  logout() {
    sessionStorage.clear();
    Toast.fire({ icon: "success", title: `Has salido correctamente !` });
    this.router.navigate([""]);
  }

  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
}

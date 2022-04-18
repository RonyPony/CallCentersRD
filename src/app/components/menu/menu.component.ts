import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Toast } from "src/app/utils/notification.toast";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

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

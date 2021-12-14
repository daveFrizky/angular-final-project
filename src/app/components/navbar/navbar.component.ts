import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private auth:AuthService,public route:Router) { }

  ngOnInit(): void {
  }

  goTo(str:string){
    this.route.navigate([`${str}`])
  }

  getUser(){
    return this.auth.getUser()
  }

  logout(){
    this.auth.logout()
  }

  isLoggin(){
    return this.auth.isLoggedIn
  }
}

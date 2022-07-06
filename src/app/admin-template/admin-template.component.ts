import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  constructor( public authService : AuthentificationService, private router : Router) { }

  ngOnInit(): void {
  }

  handleLogout(){
    this.authService.logout()
    .subscribe(
      {
        next : () => {
          this.router.navigateByUrl("/login");
        }
      }
    );
  }

}

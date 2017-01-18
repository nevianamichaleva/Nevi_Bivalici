import { AlertService } from './../shared/alert/alert.service';
import { AuthService } from './../shared/auth/auth.service';
import { Category } from './../model/category.model';
import { PublicationsService } from './../shared/publications.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
categories: Observable<Category[]>;

  constructor(
    private authService: AuthService,
    private publicationsService: PublicationsService,
    private router: Router,
    private alertService: AlertService
    ) { }
 
 isAuth() {
    return this.authService.isAuthenticated;
  }

  logout() {
    this.authService.logout();
    this.alertService.success('Успешен изход', true);
    this.router.navigate(['home']);
  }

  ngOnInit() {
    this.categories = this.publicationsService.findAllCategories();
  }

}

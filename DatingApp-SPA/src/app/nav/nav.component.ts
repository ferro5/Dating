import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AletifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = { };

  constructor(public authService: AuthService, private alertify: AletifyService, private router: Router ) { }

  ngOnInit() {
    console.log(this.model);
  }
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logout() {
      localStorage.removeItem('token');
     this.alertify.message('logged out');
     this.router.navigate(['/home']);
  }
}

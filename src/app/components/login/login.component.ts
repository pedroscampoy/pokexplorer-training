import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

  username = '';
  password = '';

  isLoggedIn$ = this.userService.isUserLoggedIn$;


  login() {
    this.userService.checkCredentials(this.username, this.password);
  }

  logout() {
    this.userService.logout();
  }

}

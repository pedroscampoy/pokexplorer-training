import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn$ = this.userService.isUserLoggedIn$;

  constructor(private userService: UserService) {}
}

import { Component } from '@angular/core';
import { logging } from 'protractor';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mg-solutions';

  constructor(private authService: AuthService) {
  }

  login() {
    this.authService.login();
  }
}

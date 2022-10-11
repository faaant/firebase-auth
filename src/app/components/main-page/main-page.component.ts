import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  constructor(private authService: AuthService) {}

  signOut() {
    this.authService.signOut()
  }
}

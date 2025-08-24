import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-app';
   isLoggedIn = false;

  constructor(private authService: AuthService,private router:Router, private location: Location) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
  }


  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToDashBoard() {
    this.router.navigate(['/dashboard']);
  }
  navigateBack() {
    this.location.back();
  }
}

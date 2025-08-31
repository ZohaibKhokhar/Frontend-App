import { Component, inject,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from '../stores/states/auth/auth.state';
import { Logout } from '../stores/states/auth/auth.actions';
import { environment } from '../environment/environment';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend-app';
  userRole='';

  // Directly observe authentication state from the store
  @Select(AuthState.isAuthenticated) isLoggedIn$!: Observable<boolean>;

  ngOnInit() {
    this.userRole = localStorage.getItem(environment.roleKey) || '';
  }

  private store = inject(Store);
  private router = inject(Router);
  private location = inject(Location);

  logout() {  
    this.store.dispatch(new Logout());
    this.router.navigate(['/login']);
  }

  navigateToDashBoard() {
    if(this.userRole === 'Admin')
    {
      this.router.navigate(['/dashboard']);
    }
    else
    {
      this.router.navigate(['/receptionist-dashboard']);
    }
  }

  navigateBack() {
    this.location.back();
  }
}

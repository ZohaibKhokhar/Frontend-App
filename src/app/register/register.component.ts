import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store, Select } from '@ngxs/store';
import { Register } from '../../stores/states/auth/auth.actions';
import { AuthState } from '../../stores/states/auth/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  @Select(AuthState.getError) errorMessage$!: Observable<string | null>;
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.store.dispatch(new Register(this.registerForm.value)).subscribe({
        next: () => {
          this.successMessage = 'Registration successful! Please login.';
          alert(this.successMessage);
          this.router.navigate(['/login']);
        },
        error: () => {
          // Error handled by state, no manual handling needed here
        }
      });
    }
  }
}

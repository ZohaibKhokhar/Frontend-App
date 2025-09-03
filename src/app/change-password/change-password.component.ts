import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthState } from '../../stores/states/auth/auth.state';
import { FormBuilder, FormGroup, ReactiveFormsModule ,Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { changePassword } from '../../stores/states/auth/auth.actions';
import { Location } from '@angular/common';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  changeForm!: FormGroup;
  @Select(AuthState.getError) errorMessage$!: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private location:Location
  ) {}

  ngOnInit() {
    this.changeForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  onSubmit() {
  if (this.changeForm.valid) {
    this.store.dispatch(new changePassword(this.changeForm.value)).subscribe({
      next: () => {
        this.location.back();
        alert('Password Changed Successfully!');
      },
      error: () => alert('Failed To change Password')
    });
  }
}


}

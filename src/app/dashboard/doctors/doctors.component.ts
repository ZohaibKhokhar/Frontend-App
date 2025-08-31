import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DoctorRead } from '../../../models/doctor/doctor-read.model';
import { GetDoctors, DeleteDoctor } from '../../../stores/states/doctor/doctor.actions';
import { DoctorState } from '../../../stores/states/doctor/doctor.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent implements OnInit {
  @Select(DoctorState.doctors) doctors$!: Observable<DoctorRead[]>;
  @Select(DoctorState.loading) isLoading$!: Observable<boolean>;
  @Select(DoctorState.error) errorMessage$!: Observable<string | null>;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new GetDoctors());
  }

  deleteDoctor(id: number) {
    if(confirm('Are you sure you want to delete this doctor?'))
    {
      this.store.dispatch(new DeleteDoctor(id));
    }
  }

  updateDoctor(id: number) {
    this.router.navigate(['/doctors/update', id]);
  }

  navigateToAddDoctor() {
    this.router.navigate(['/doctors/add']);
  }
}

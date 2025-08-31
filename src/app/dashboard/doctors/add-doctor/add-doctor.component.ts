import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { Store } from '@ngxs/store';
import { AlphaSpaceOnlyDirective } from '../../../../directives/alpha-space-only.directive';
import { AddDoctor, UpdateDoctor, GetDoctorById } from '../../../../stores/states/doctor/doctor.actions';
import { DoctorState } from '../../../../stores/states/doctor/doctor.state';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlphaSpaceOnlyDirective],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.scss'
})
export class AddDoctorComponent implements OnInit {
  doctorForm!: FormGroup;
  isEditMode = false;
  doctorId!: number;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private store = inject(Store);

  ngOnInit() {
    this.doctorId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.doctorId;

    this.doctorForm = this.fb.group({
      doctorName: ['', Validators.required],
      doctorAge: ['', [Validators.required, Validators.min(25)]],
      doctorEmail: ['', [Validators.required, Validators.email]],
      doctorPhoneNumber: ['', Validators.required],
    });

    if (this.isEditMode) {
      this.loadDoctorData();
    }
  }

  async loadDoctorData() {
    await firstValueFrom(this.store.dispatch(new GetDoctorById(this.doctorId)));
    const doctor = this.store.selectSnapshot(DoctorState.selectedDoctor);
    if (doctor) {
      this.doctorForm.patchValue(doctor);
    }
  }

  navigateBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.doctorForm.invalid) return;

    const doctorData = this.doctorForm.value;

    if (this.isEditMode) {
      this.store.dispatch(new UpdateDoctor(this.doctorId, doctorData)).subscribe({
        next: () => this.router.navigate(['/doctors']),
        error: () => alert('Failed to update doctor'),
      });
    } else {
      this.store.dispatch(new AddDoctor(doctorData)).subscribe({
        next: () => this.router.navigate(['/doctors']),
        error: () => alert('Failed to add doctor, please check inputs'),
      });
    }
  }
}

// add-doctor.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../../../services/doctor/doctor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.scss'
})
export class AddDoctorComponent implements OnInit {
  doctorForm!: FormGroup;
  isEditMode = false;
  doctorId!: number;

  private fb = inject(FormBuilder);
  private doctorService = inject(DoctorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
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

  loadDoctorData() {
    this.doctorService.getDoctorById(this.doctorId).subscribe(doctor => {
      this.doctorForm.patchValue(doctor);
    });
  }

  navigateBack() {
   this.location.back();
  }

  onSubmit() {
    if (this.doctorForm.invalid) return;

    const doctorData = this.doctorForm.value;

    if (this.isEditMode) {
      this.doctorService.updateDoctor(this.doctorId, doctorData).subscribe(() => {
        this.router.navigate(['/doctors']);
      });
    } else {
      this.doctorService.addDoctor(doctorData).subscribe(() => {
        this.router.navigate(['/doctors']);
      });
    }
  }
}

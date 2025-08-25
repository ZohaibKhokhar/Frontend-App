// add-patient.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../../services/patient/patient.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.scss'
})
export class AddPatientComponent implements OnInit {
  patientForm!: FormGroup;
  isEditMode = false;
  patientId!: number;

  private fb = inject(FormBuilder);
  private patientService = inject(PatientService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  ngOnInit() {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.patientId;

      this.patientForm = this.fb.group({
      patientName: ['', Validators.required],
      patientAge: ['', [Validators.required, Validators.min(0)]], 
      patientEmail: ['', [Validators.required, Validators.email]],
      patientPhoneNumber: ['', Validators.required],
    });

    if (this.isEditMode) {
      this.loadPatientData();
    }
  }

  loadPatientData() {
    this.patientService.getPatientById(this.patientId).subscribe(patient => {
      this.patientForm.patchValue(patient);
    });
  }

  navigateBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.patientForm.invalid) return;

    const patientData = this.patientForm.value;

    if (this.isEditMode) {
this.patientService.updatePatient(this.patientId, patientData).subscribe({
  next: () => {
    this.router.navigate(['/patients']);
  },
  error: () => {
    alert("Failed to update patient");
  }
});

    } else {
     this.patientService.addPatient(patientData).subscribe({
  next: () => {
    this.router.navigate(['/patients']);
  },
  error: () => {
    alert("Failed to add patient");
  }
});

    }
  }
}

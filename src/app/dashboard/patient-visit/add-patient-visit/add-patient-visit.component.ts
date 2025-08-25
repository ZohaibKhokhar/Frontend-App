import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

import { PatientVisitService } from '../../../../services/patientvisit/patient-visit.service';
import { PatientService } from '../../../../services/patient/patient.service';
import { DoctorService } from '../../../../services/doctor/doctor.service';
import { VisitTypeService } from '../../../../services/visit-type/visit-type.service';

import { PatientRead } from '../../../../models/patient/patient-read.model';
import { DoctorRead } from '../../../../models/doctor/doctor-read.model';
import { VisitTypeRead } from '../../../../models/visit-type/visit-type-read.model';
import { PatientVisitCreate } from '../../../../models/patient-visit/patient-visit-create.model';

@Component({
  selector: 'app-add-patient-visit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-patient-visit.component.html',
  styleUrl: './add-patient-visit.component.scss'
})
export class AddPatientVisitComponent implements OnInit {
  patientVisitForm!: FormGroup;
  isEditMode = false;
  visitId!: number;

  patients: PatientRead[] = [];
  doctors: DoctorRead[] = [];
  visitTypes: VisitTypeRead[] = [];

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  private patientVisitService = inject(PatientVisitService);
  private patientService = inject(PatientService);
  private doctorService = inject(DoctorService);
  private visitTypeService = inject(VisitTypeService);

  ngOnInit() {
    this.visitId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.visitId;

    this.patientVisitForm = this.fb.group({
      patientID: ['', Validators.required],
      doctorID: ['', Validators.required],
      visitTypeID: ['', Validators.required],
      visitDate: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.loadPatients();
    this.loadDoctors();
    this.loadVisitTypes();

    if (this.isEditMode) {
      this.loadPatientVisitData();
    }
  }

  loadPatients() {
    this.patientService.getPatients().subscribe({
      next: (data) => this.patients = data,
      error: (err) => console.error('Error loading patients:', err)
    });
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (data) => this.doctors = data,
      error: (err) => console.error('Error loading doctors:', err)
    });
  }

  loadVisitTypes() {
    this.visitTypeService.getVisitTypes().subscribe({
      next: (data) => this.visitTypes = data,
      error: (err) => console.error('Error loading visit types:', err)
    });
  }

  loadPatientVisitData() {
    this.patientVisitService.getPatientVisitById(this.visitId).subscribe(visit => {
      this.patientVisitForm.patchValue(visit);
    });
  }

  navigateBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.patientVisitForm.invalid) return;

    const visitData: PatientVisitCreate = this.patientVisitForm.value;

    if (this.isEditMode) {
      this.patientVisitService.updatePatientVisit(this.visitId, visitData).subscribe({
  next: () => {
    this.router.navigate(['/patient-visits']);
  },
  error: () => {
    alert("Failed to update patient visit");
  }
});
    } else {
      this.patientVisitService.addPatientVisit(visitData).subscribe({
  next: () => {
    this.router.navigate(['/patient-visits']);
  },
  error: () => {
    alert("Failed to add patient please make sure all inputs are correct");
  }
});
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { PatientRead } from '../../../models/patient/patient-read.model';
import { PatientService } from '../../../services/patient/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [], 
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent implements OnInit {
  patients: PatientRead[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
        this.isLoading = false;
        console.log('Patients loaded successfully', data);
      },
      error: (err) => {
        console.error('Error fetching patients:', err);
        this.errorMessage = 'Failed to load patients.';
        this.isLoading = false;
      }
    });
  }

  deletePatient(id: number) {
    this.patientService.deletePatient(id).subscribe({
      next: () => {
        this.patients = this.patients.filter(patient => patient.patientID !== id);
        console.log('Patient deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting patient:', err);
      }
    });
  }

  updatePatient(id: number) {
    this.router.navigate(['/patients/update', id]);
  }

  navigateToAddPatient() {
    this.router.navigate(['/patients/add']);
  }
}

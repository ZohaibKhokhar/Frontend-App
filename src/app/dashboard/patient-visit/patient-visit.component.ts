import { Component, OnInit } from '@angular/core';
import { PatientVisitRead } from '../../../models/patient-visit/patient-visit-read.model';
import { PatientVisitService } from '../../../services/patientvisit/patient-visit.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientRead } from '../../../models/patient/patient-read.model';
import { DoctorRead } from '../../../models/doctor/doctor-read.model';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { PatientService } from '../../../services/patient/patient.service';
import { VisitTypeRead } from '../../../models/visit-type/visit-type-read.model';
import { VisitTypeService } from '../../../services/visit-type/visit-type.service';
@Component({
  selector: 'app-patient-visits',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.scss']
})
export class PatientVisitComponent implements OnInit {
  patientVisits: PatientVisitRead[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  patients: PatientRead[] = [];
  doctors: DoctorRead[] = [];
  visitTypes: VisitTypeRead[] = [];

  constructor(
    private patientVisitService: PatientVisitService,
     private router: Router, 
     private patientService: PatientService, 
     private doctorService: DoctorService, 
     private visitTypeService: VisitTypeService) {}

  ngOnInit(): void {
    this.loadPatientVisits();
    this.loadDoctors();
    this.loadPatients();
    this.loadVisitTypes();
  }

  loadPatientVisits() {
    this.patientVisitService.getPatientVisits().subscribe({
      next: (data) => {
        this.patientVisits = data;
        console.log(data);
        this.isLoading = false;
        console.log('Patient visits loaded successfully', data);
      },
      error: (err) => {
        console.error('Error fetching patient visits:', err);
        this.errorMessage = 'Failed to load patient visits.';
        this.isLoading = false;
      }
    });
  }

  loadPatients(){
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
        console.log('Patients loaded successfully', data);
      },
      error: (err) => {
        console.error('Error fetching patients:', err);
      }
    });
  }

  loadDoctors(){
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        console.log('Doctors loaded successfully', data);
      },
      error: (err) => {
        console.error('Error fetching doctors:', err);
      }
    });
  }

  loadVisitTypes()
  {
    this.visitTypeService.getVisitTypes().subscribe({
      next: (data) => {
        this.visitTypes = data;
        console.log('Visit types loaded successfully', data);
      },
      error: (err) => {
        console.error('Error fetching visit types:', err);
      }
    });
  }

  getVisitTypeName(visitTypeId: number): string | undefined {
    const visitType = this.visitTypes.find(v => v.visitTypeID === visitTypeId);
    return visitType ? visitType.typeName : undefined;
  }

  getPatientName(patientId: number): string | undefined {
    const patient = this.patients.find(p => p.patientID === patientId);
    return patient ? patient.patientName : undefined;
  }

  getDoctorName(doctorId: number): string | undefined {
    const doctor = this.doctors.find(d => d.doctorID === doctorId);
    return doctor ? doctor.doctorName : undefined;
  }

  deletePatientVisit(id: number) {
    if(!confirm('Are you sure you want to delete this patient visit?')) 
      return;

    this.patientVisitService.deletePatientVisit(id).subscribe({
      next: () => {
        this.patientVisits = this.patientVisits.filter(visit => visit.visitID !== id);
        console.log('Patient visit deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting patient visit:', err);
      }
    });
  }

  updatePatientVisit(id: number) {
    this.router.navigate(['/patient-visits/update', id]);
  }

  navigateToAddPatientVisit() {
    this.router.navigate(['/patient-visits/add']);
  }
}

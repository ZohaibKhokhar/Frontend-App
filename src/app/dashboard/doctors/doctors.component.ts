import { Component, OnInit } from '@angular/core';
import { DoctorRead } from '../../../models/doctor/doctor-read.model';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [], 
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent implements OnInit {
  doctors: DoctorRead[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private doctorService: DoctorService,private router:Router) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.isLoading = false;
        console.log('everything is fine',data);
      },
      error: (err) => {
        console.error('Error fetching doctors:', err);
        this.errorMessage = 'Failed to load doctors.';
        this.isLoading = false;
      }
    });
  }

  deleteDoctor(id:number){
    this.doctorService.deleteDoctor(id).subscribe({
      next: () => {
        this.doctors = this.doctors.filter(doctor => doctor.doctorID !== id);
        console.log('Doctor deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting doctor:', err);
      }
    });
  }

  updateDoctor(id:number){
    this.router.navigate(['/doctors/update', id]);
  }

  navigateToAddDoctor(){
    this.router.navigate(['/doctors/add']);
  }
}

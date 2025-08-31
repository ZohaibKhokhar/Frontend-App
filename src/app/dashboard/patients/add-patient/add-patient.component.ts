import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { Store, Select } from '@ngxs/store';
import { AddPatient, UpdatePatient, GetPatientById } from '../../../../stores/states/patient/patient.actions';
import { PatientState } from '../../../../stores/states/patient/patient.state';
import { Observable } from 'rxjs';
import { PatientRead } from '../../../../models/patient/patient-read.model';
import { AlphaSpaceOnlyDirective } from '../../../../directives/alpha-space-only.directive';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlphaSpaceOnlyDirective],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.scss'
})
export class AddPatientComponent implements OnInit {
  patientForm!: FormGroup;
  isEditMode = false;
  patientId!: number;

  @Select(PatientState.getSelectedPatient) patient$!: Observable<PatientRead | null>;
  @Select(PatientState.getLoading) loading$!: Observable<boolean>;
  @Select(PatientState.getError) error$!: Observable<string | null>;

  private fb = inject(FormBuilder);
  private store = inject(Store);
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
      this.store.dispatch(new GetPatientById(this.patientId));
      this.patient$.subscribe(patient => {
        if (patient) {
          this.patientForm.patchValue(patient);
        }
      });
    }
  }

  navigateBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.patientForm.invalid) return;

    const patientData = this.patientForm.value;

    if (this.isEditMode) {
      this.store.dispatch(new UpdatePatient(this.patientId, patientData)).subscribe({
        next: () => this.router.navigate(['/patients']),
        error: () => alert('Failed to update patient')
      });
    } else {
      this.store.dispatch(new AddPatient(patientData)).subscribe({
        next: () => this.router.navigate(['/patients']),
        error: () => alert('Failed to add patient')
      });
    }
  }
}

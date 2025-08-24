import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VisitTypeService } from '../../../../services/visit-type/visit-type.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-visit-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-visit-type.component.html',
  styleUrl: './add-visit-type.component.scss'
})
export class AddVisitTypeComponent implements OnInit {
  visitTypeForm!: FormGroup;
  isEditMode = false;
  visitTypeId!: number;

  private fb = inject(FormBuilder);
  private visitTypeService = inject(VisitTypeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  ngOnInit() {
    this.visitTypeId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.visitTypeId;

    this.visitTypeForm = this.fb.group({
      typeName: ['', Validators.required],
    });

    if (this.isEditMode) {
      this.loadVisitTypeData();
    }
  }

  loadVisitTypeData() {
    this.visitTypeService.getVisitTypeById(this.visitTypeId).subscribe(visitType => {
      this.visitTypeForm.patchValue(visitType);
    });
  }

  navigateBack() {
    this.location.back();
  }

  onSubmit() {
    if (this.visitTypeForm.invalid) return;

    const visitTypeData = this.visitTypeForm.value;

    if (this.isEditMode) {
      this.visitTypeService.updateVisitType(this.visitTypeId, visitTypeData).subscribe(() => {
        this.router.navigate(['/visit-types']);
      });
    } else {
      this.visitTypeService.addVisitType(visitTypeData).subscribe(() => {
        this.router.navigate(['/visit-types']);
      });
    }
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fee-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fee-dialog.component.html',
  styleUrls: ['./fee-dialog.component.scss']
})
export class FeeDialogComponent {
  feeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { visitType: any; fee: number | null; maxFee: number },
    private fb: FormBuilder
  ) {
    this.feeForm = this.fb.group({
      fee: [data.fee, [Validators.required, Validators.min(1), Validators.max(data.maxFee)]]
    });
  }

  onSubmit() {
    if (this.feeForm.valid) {
      this.dialogRef.close(this.feeForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

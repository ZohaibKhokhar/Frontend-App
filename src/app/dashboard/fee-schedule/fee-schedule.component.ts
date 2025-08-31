import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store, Select } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';
import { VisitTypeRead } from '../../../models/visit-type/visit-type-read.model';
import { FeeSchedule } from '../../../stores/states/fee-schedule/fee-schedule.model';
import { VisitTypeState } from '../../../stores/states/visittype/visit-type.state';
import { FeeScheduleState } from '../../../stores/states/fee-schedule/fee-schedule.state';
import { LoadVisitTypes } from '../../../stores/states/visittype/visit-type.actions';
import { LoadFeeSchedules, CreateFeeSchedule, UpdateFeeSchedule, DeleteFeeSchedule  } from '../../../stores/states/fee-schedule/fee-schedule.actions';
import { FeeDialogComponent } from './fee-dialog/fee-dialog.component';

@Component({
  selector: 'app-fee-schedule',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fee-schedule.component.html',
  styleUrls: ['./fee-schedule.component.scss']
})
export class FeeScheduleComponent implements OnInit {
  @Select(VisitTypeState.getVisitTypes) visitTypes$!: Observable<VisitTypeRead[]>;
  @Select(FeeScheduleState.getAll) feeSchedules$!: Observable<FeeSchedule[]>;

  visitTypes: VisitTypeRead[] = [];
  feeSchedules: FeeSchedule[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.errorMessage = null;

    forkJoin([
      this.store.dispatch(new LoadVisitTypes()),
      this.store.dispatch(new LoadFeeSchedules())
    ]).subscribe({
      next: () => {
        this.visitTypes$.subscribe(vt => (this.visitTypes = vt));
        this.feeSchedules$.subscribe(fs => (this.feeSchedules = fs));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.errorMessage = 'Failed to load fee schedules.';
        this.isLoading = false;
      }
    });
  }

  getFeeForVisitType(visitTypeId: number): FeeSchedule | undefined {
    return this.feeSchedules.find(f => f.visitTypeID === visitTypeId);
  }

  openFeeDialog(visitType: VisitTypeRead, existingFee?: FeeSchedule) {
    const dialogRef = this.dialog.open(FeeDialogComponent, {
      width: '400px',
      data: {
        visitType,
        fee: existingFee ? existingFee.fee : null,
        maxFee: 10000 // Example max fee limit
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.fee > 0) {
        if (existingFee) {
          this.updateFee(existingFee.feeID, result.fee, visitType.visitTypeID);
        } else {
          this.addFee(result.fee, visitType.visitTypeID);
        }
      }
    });
  }

  addFee(fee: number, visitTypeID: number) {
    this.store.dispatch(new CreateFeeSchedule({ visitTypeID, fee })).subscribe({
      next: () => console.log('Fee added successfully'),
      error: (err) => {
        console.error('Error adding fee:', err);
        this.errorMessage = 'Failed to add fee.';
      }
    });
  }

 deleteFee(id:number)
 {
  if(!confirm('Are you sure you want to delete this fee?')) return;
   this.store.dispatch(new DeleteFeeSchedule(id)).subscribe({
     next: () => console.log('Fee deleted successfully'),
     error: (err) => {
       console.error('Error deleting fee:', err);
       this.errorMessage = 'Failed to delete fee.';
     }
   });
 }

  updateFee(feeID: number, fee: number, visitTypeID: number) {
    this.store.dispatch(new UpdateFeeSchedule(feeID, { visitTypeID, fee })).subscribe({
      next: () => console.log('Fee updated successfully'),
      error: (err) => {
        console.error('Error updating fee:', err);
        this.errorMessage = 'Failed to update fee.';
      }
    });
  }
}

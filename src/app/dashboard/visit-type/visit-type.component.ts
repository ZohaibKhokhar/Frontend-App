import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { VisitTypeRead } from '../../../models/visit-type/visit-type-read.model';
import { VisitTypeState } from '../../../stores/states/visittype/visit-type.state';
import { LoadVisitTypes, DeleteVisitType } from '../../../stores/states/visittype/visit-type.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visit-types',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './visit-type.component.html',
  styleUrls: ['./visit-type.component.scss']
})
export class VisitTypeComponent implements OnInit {
  @Select(VisitTypeState.getVisitTypes) visitTypes$!: Observable<VisitTypeRead[]>;

  isLoading = true;
  errorMessage: string | null = null;
  deleteLoading = new Set<number>(); // Track which items are being deleted

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.loadVisitTypes();
  }

  loadVisitTypes() {
    this.isLoading = true;
    this.errorMessage = null;

    this.store.dispatch(new LoadVisitTypes()).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading visit types:', err);
        this.errorMessage = 'Failed to load visit types.';
        this.isLoading = false;
      }
    });
  }

  deleteVisitType(id: number) {
    if (confirm('Are you sure you want to delete this visit type?')) {
      this.deleteLoading.add(id);
      
      this.store.dispatch(new DeleteVisitType(id)).subscribe({
        next: () => {
          console.log('Visit type deleted successfully');
          this.deleteLoading.delete(id);
        },
        error: (err) => {
          console.error('Error deleting visit type:', err);
          this.errorMessage = 'Failed to delete visit type.';
          this.deleteLoading.delete(id);
        }
      });
    }
  }

  isDeleting(id: number): boolean {
    return this.deleteLoading.has(id);
  }

  updateVisitType(id: number) {
    this.router.navigate(['/visit-types/update', id]);
  }

  navigateToAddVisitType() {
    this.router.navigate(['/visit-types/add']);
  }
}
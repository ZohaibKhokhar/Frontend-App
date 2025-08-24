import { Component, OnInit } from '@angular/core';
import { VisitTypeRead } from '../../../models/visit-type/visit-type-read.model';
import { VisitTypeService } from '../../../services/visit-type/visit-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visit-types',
  standalone: true,
  imports: [],
  templateUrl: './visit-type.component.html',
  styleUrl: './visit-type.component.scss'
})
export class VisitTypeComponent implements OnInit {
  visitTypes: VisitTypeRead[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private visitTypeService: VisitTypeService, private router: Router) {}

  ngOnInit(): void {
    this.loadVisitTypes();
  }

  loadVisitTypes() {
    this.visitTypeService.getVisitTypes().subscribe({
      next: (data) => {
        this.visitTypes = data;
        console.log(this.visitTypes);
        console.log(data);
        this.isLoading = false;
        console.log('Visit types loaded successfully', data);
      },
      error: (err) => {
        console.error('Error fetching visit types:', err);
        this.errorMessage = 'Failed to load visit types.';
        this.isLoading = false;
      }
    });
  }

  deleteVisitType(id: number) {
    console.log(id);
    this.visitTypeService.deleteVisitType(id).subscribe({
      next: () => {
        this.visitTypes = this.visitTypes.filter(visitType => visitType.visitTypeID !== id);
        console.log('Visit type deleted successfully');
      },
      error: (err) => {
        console.error('Error deleting visit type:', err);
      }
    });
  }

  updateVisitType(id: number) {
    this.router.navigate(['/visit-types/update', id]);
  }

  navigateToAddVisitType() {
    this.router.navigate(['/visit-types/add']);
  }
}

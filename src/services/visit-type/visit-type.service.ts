import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VisitTypeRead } from '../../models/visit-type/visit-type-read.model';
import { VisitTypeCreate } from '../../models/visit-type/visit-type-create.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitTypeService {

  private apiUrl = `${environment.baseUrl}/VisitType`;

  constructor(private http: HttpClient) {}

  getVisitTypes(): Observable<VisitTypeRead[]> {
    return this.http.get<VisitTypeRead[]>(this.apiUrl);
  }

  getVisitTypeById(id: number): Observable<VisitTypeRead> {
    return this.http.get<VisitTypeRead>(`${this.apiUrl}/${id}`);
  }

  addVisitType(visitType: VisitTypeCreate): Observable<VisitTypeRead> {
    return this.http.post<VisitTypeRead>(this.apiUrl, visitType);
  }

  updateVisitType(id: number, visitType: VisitTypeCreate): Observable<VisitTypeRead> {
    return this.http.put<VisitTypeRead>(`${this.apiUrl}/${id}`, visitType);
  }

  deleteVisitType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

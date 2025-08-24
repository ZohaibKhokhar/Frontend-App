import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(environment.tokenKey);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getVisitTypes(): Observable<VisitTypeRead[]> {
    return this.http.get<VisitTypeRead[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getVisitTypeById(id: number): Observable<VisitTypeRead> {
    return this.http.get<VisitTypeRead>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  addVisitType(visitType: VisitTypeCreate): Observable<VisitTypeRead> {
    return this.http.post<VisitTypeRead>(this.apiUrl, visitType, { headers: this.getAuthHeaders() });
  }

  updateVisitType(id: number, visitType: VisitTypeCreate): Observable<VisitTypeRead> {
    return this.http.put<VisitTypeRead>(`${this.apiUrl}/${id}`, visitType, { headers: this.getAuthHeaders() });
  }

  deleteVisitType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientVisitCreate } from '../../models/patient-visit/patient-visit-create.model';
import { PatientVisitRead } from '../../models/patient-visit/patient-visit-read.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientVisitService {

  private apiUrl = `${environment.baseUrl}/PatientVisit`;

  constructor(private http: HttpClient) {}

  // Helper to get headers with JWT
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem(environment.tokenKey); 
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getPatientVisits(): Observable<PatientVisitRead[]> {
    return this.http.get<PatientVisitRead[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getPatientVisitById(id: number): Observable<PatientVisitRead> {
    return this.http.get<PatientVisitRead>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  addPatientVisit(patientVisit: PatientVisitCreate): Observable<PatientVisitRead> {
    return this.http.post<PatientVisitRead>(this.apiUrl, patientVisit, { headers: this.getAuthHeaders() });
  }

  updatePatientVisit(id: number, patientVisit: PatientVisitCreate): Observable<PatientVisitRead> {
    return this.http.put<PatientVisitRead>(`${this.apiUrl}/${id}`, patientVisit, { headers: this.getAuthHeaders() });
  }

  deletePatientVisit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}

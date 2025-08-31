import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getPatientVisits(): Observable<PatientVisitRead[]> {
    return this.http.get<PatientVisitRead[]>(this.apiUrl);
  }

  getPatientVisitById(id: number): Observable<PatientVisitRead> {
    return this.http.get<PatientVisitRead>(`${this.apiUrl}/${id}`);
  }

  addPatientVisit(patientVisit: PatientVisitCreate): Observable<PatientVisitRead> {
    return this.http.post<PatientVisitRead>(this.apiUrl, patientVisit);
  }

  updatePatientVisit(id: number, patientVisit: PatientVisitCreate): Observable<PatientVisitRead> {
    return this.http.put<PatientVisitRead>(`${this.apiUrl}/${id}`, patientVisit);
  }

  deletePatientVisit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

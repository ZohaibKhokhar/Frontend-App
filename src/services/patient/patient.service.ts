import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientCreate } from '../../models/patient/patient-create.model';
import { PatientRead} from '../../models/patient/patient-read.model';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = `${environment.baseUrl}/Patient`;

  constructor(private http: HttpClient) {}

  getPatients(): Observable<PatientRead[]> {
    return this.http.get<PatientRead[]>(this.apiUrl);
  }

  getPatientById(id: number): Observable<PatientRead> {
    return this.http.get<PatientRead>(`${this.apiUrl}/${id}`);
  }

  addPatient(patient: PatientCreate): Observable<PatientRead> {
    return this.http.post<PatientRead>(this.apiUrl, patient);
  }

  updatePatient(id: number, patient: PatientCreate): Observable<PatientRead> {
    return this.http.put<PatientRead>(`${this.apiUrl}/${id}`, patient);
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

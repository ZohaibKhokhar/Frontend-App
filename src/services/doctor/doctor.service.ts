import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DoctorRead } from '../../models/doctor/doctor-read.model';
import { DoctorCreate } from '../../models/doctor/doctor-create.model';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = `${environment.baseUrl}/Doctor`;

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<DoctorRead[]> {
    return this.http.get<DoctorRead[]>(this.apiUrl);
  }

  getDoctorById(id: number): Observable<DoctorRead> {
    return this.http.get<DoctorRead>(`${this.apiUrl}/${id}`);
  }

  addDoctor(doctor: DoctorCreate): Observable<DoctorRead> {
    return this.http.post<DoctorRead>(this.apiUrl, doctor);
  }

  updateDoctor(id: number, doctor: DoctorCreate): Observable<DoctorRead> {
    return this.http.put<DoctorRead>(`${this.apiUrl}/${id}`, doctor);
  }

 
  deleteDoctor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

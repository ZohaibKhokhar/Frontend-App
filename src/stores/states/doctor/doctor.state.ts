import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { DoctorRead } from '../../../models/doctor/doctor-read.model';
import { DoctorCreate } from '../../../models/doctor/doctor-create.model';
import { GetDoctors, GetDoctorById, AddDoctor, UpdateDoctor, DeleteDoctor } from './doctor.actions';
import { DoctorStateModel } from './doctor-state.model';

@State<DoctorStateModel>({
  name: 'doctor',
  defaults: {
    doctors: [],
    selectedDoctor: null,
    loading: false,
    error: null
  }
})
@Injectable()
export class DoctorState {

  private apiUrl = `${environment.baseUrl}/Doctor`;

  constructor(private http: HttpClient) {}

  // SELECTORS
  @Selector()
  static doctors(state: DoctorStateModel) {
    return state.doctors;
  }

  @Selector()
  static selectedDoctor(state: DoctorStateModel) {
    return state.selectedDoctor;
  }

  @Selector()
  static loading(state: DoctorStateModel) {
    return state.loading;
  }

  @Selector()
  static error(state: DoctorStateModel) {
    return state.error;
  }

  // ACTIONS
  @Action(GetDoctors)
  getDoctors(ctx: StateContext<DoctorStateModel>) {
    ctx.patchState({ loading: true, error: null });
    return this.http.get<DoctorRead[]>(this.apiUrl).pipe(
      tap(doctors => ctx.patchState({ doctors, loading: false })),
      catchError(error => {
        ctx.patchState({ loading: false, error: error.message });
        return of(error);
      })
    );
  }

  @Action(GetDoctorById)
  getDoctorById(ctx: StateContext<DoctorStateModel>, { id }: GetDoctorById) {
    ctx.patchState({ loading: true, error: null });
    return this.http.get<DoctorRead>(`${this.apiUrl}/${id}`).pipe(
      tap(doctor => ctx.patchState({ selectedDoctor: doctor, loading: false })),
      catchError(error => {
        ctx.patchState({ loading: false, error: error.message });
        return of(error);
      })
    );
  }

  @Action(AddDoctor)
  addDoctor(ctx: StateContext<DoctorStateModel>, { payload }: AddDoctor) {
    ctx.patchState({ loading: true, error: null });
    return this.http.post<DoctorRead>(this.apiUrl, payload).pipe(
      tap(newDoctor => {
        const state = ctx.getState();
        ctx.patchState({
          doctors: [...state.doctors, newDoctor],
          loading: false
        });
      }),
      catchError(error => {
        ctx.patchState({ loading: false, error: error.message });
        return of(error);
      })
    );
  }

  @Action(UpdateDoctor)
  updateDoctor(ctx: StateContext<DoctorStateModel>, { id, payload }: UpdateDoctor) {
    ctx.patchState({ loading: true, error: null });
    return this.http.put<DoctorRead>(`${this.apiUrl}/${id}`, payload).pipe(
      tap(updatedDoctor => {
        const state = ctx.getState();
        const doctors = state.doctors.map(d =>
          d.doctorID === id ? updatedDoctor : d
        );
        ctx.patchState({ doctors, loading: false });
      }),
      catchError(error => {
        ctx.patchState({ loading: false, error: error.message });
        return of(error);
      })
    );
  }

  @Action(DeleteDoctor)
  deleteDoctor(ctx: StateContext<DoctorStateModel>, { id }: DeleteDoctor) {
    ctx.patchState({ loading: true, error: null });
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.patchState({
          doctors: state.doctors.filter(d => d.doctorID !== id),
          loading: false
        });
      }),
      catchError(error => {
        ctx.patchState({ loading: false, error: error.message });
        return of(error);
      })
    );
  }
}

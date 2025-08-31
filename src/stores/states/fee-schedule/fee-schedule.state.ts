import { State, Action, Selector, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { FeeSchedule, FeeScheduleStateModel } from './fee-schedule.model';
import {
  LoadFeeSchedules,
  LoadFeeScheduleById,
  CreateFeeSchedule,
  UpdateFeeSchedule,
  DeleteFeeSchedule
} from './fee-schedule.actions';
import { environment } from '../../../environment/environment';

@State<FeeScheduleStateModel>({
  name: 'feeSchedule',
  defaults: {
    feeSchedules: [],
    selectedFeeSchedule: null,
    loading: false
  }
})
@Injectable()
export class FeeScheduleState {
  private apiUrl = `${environment.baseUrl}/FeeSchedule`; 

  constructor(private http: HttpClient) {}

  @Selector()
  static getAll(state: FeeScheduleStateModel) {
    return state.feeSchedules;
  }

  @Selector()
  static getSelected(state: FeeScheduleStateModel) {
    return state.selectedFeeSchedule;
  }

  @Selector()
  static isLoading(state: FeeScheduleStateModel) {
    return state.loading;
  }

  @Action(LoadFeeSchedules)
  loadFeeSchedules(ctx: StateContext<FeeScheduleStateModel>) {
    ctx.patchState({ loading: true });
    return this.http.get<FeeSchedule[]>(this.apiUrl).pipe(
      tap(feeSchedules => {
        ctx.patchState({ feeSchedules, loading: false });
      })
    );
  }

  @Action(LoadFeeScheduleById)
  loadFeeScheduleById(ctx: StateContext<FeeScheduleStateModel>, { id }: LoadFeeScheduleById) {
    ctx.patchState({ loading: true });
    return this.http.get<FeeSchedule>(`${this.apiUrl}/${id}`).pipe(
      tap(feeSchedule => {
        ctx.patchState({ selectedFeeSchedule: feeSchedule, loading: false });
      })
    );
  }

  @Action(CreateFeeSchedule)
  createFeeSchedule(ctx: StateContext<FeeScheduleStateModel>, { payload }: CreateFeeSchedule) {
    return this.http.post<FeeSchedule>(this.apiUrl, payload).pipe(
      tap(newFeeSchedule => {
        const state = ctx.getState();
        ctx.patchState({
          feeSchedules: [...state.feeSchedules, newFeeSchedule]
        });
      })
    );
  }

  @Action(UpdateFeeSchedule)
  updateFeeSchedule(ctx: StateContext<FeeScheduleStateModel>, { id, payload }: UpdateFeeSchedule) {
    return this.http.put(`${this.apiUrl}/${id}`, payload).pipe(
      tap(() => {
        const state = ctx.getState();
        const updatedList = state.feeSchedules.map(f =>
          f.feeID === id ? { ...f, ...payload } : f
        );
        ctx.patchState({ feeSchedules: updatedList });
      })
    );
  }

  @Action(DeleteFeeSchedule)
  deleteFeeSchedule(ctx: StateContext<FeeScheduleStateModel>, { id }: DeleteFeeSchedule) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.patchState({
          feeSchedules: state.feeSchedules.filter(f => f.feeID !== id)
        });
      })
    );
  }
}

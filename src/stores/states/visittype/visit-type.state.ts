import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { LoadVisitTypes, AddVisitType, UpdateVisitType, DeleteVisitType } from './visit-type.actions';
import { tap } from 'rxjs/operators';
import { VisitTypeRead } from '../../../models/visit-type/visit-type-read.model';

export interface VisitTypeStateModel {
  visitTypes: VisitTypeRead[];
}

@State<VisitTypeStateModel>({
  name: 'visitType',
  defaults: {
    visitTypes: []
  }
})
@Injectable()
export class VisitTypeState {
  private apiUrl = `${environment.baseUrl}/VisitType`;

  constructor(private http: HttpClient) {}

  @Selector()
  static getVisitTypes(state: VisitTypeStateModel) {
    return state.visitTypes;
  }

  @Action(LoadVisitTypes)
  loadVisitTypes(ctx: StateContext<VisitTypeStateModel>) {
    return this.http.get<VisitTypeRead[]>(this.apiUrl).pipe(
      tap((visitTypes) => ctx.patchState({ visitTypes }))
    );
  }

  @Action(AddVisitType)
  addVisitType(ctx: StateContext<VisitTypeStateModel>, action: AddVisitType) {
    return this.http.post<VisitTypeRead>(this.apiUrl, action.payload).pipe(
      tap((newVisitType) => {
        const state = ctx.getState();
        ctx.patchState({ visitTypes: [...state.visitTypes, newVisitType] });
      })
    );
  }

  @Action(UpdateVisitType)
  updateVisitType(ctx: StateContext<VisitTypeStateModel>, action: UpdateVisitType) {
    return this.http.put<VisitTypeRead>(`${this.apiUrl}/${action.id}`, action.payload).pipe(
      tap((updatedVisitType) => {
        const state = ctx.getState();
        ctx.patchState({
          visitTypes: state.visitTypes.map(v =>
            v.visitTypeID === action.id ? updatedVisitType : v
          )
        });
      })
    );
  }

  @Action(DeleteVisitType)
  deleteVisitType(ctx: StateContext<VisitTypeStateModel>, action: DeleteVisitType) {
    return this.http.delete<void>(`${this.apiUrl}/${action.id}`).pipe(
      tap(() => {
        const state = ctx.getState();
        ctx.patchState({
          visitTypes: state.visitTypes.filter(v => v.visitTypeID !== action.id)
        });
      })
    );
  }
}

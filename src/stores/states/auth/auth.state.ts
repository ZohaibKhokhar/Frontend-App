// store/auth.state.ts
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Login, Logout, Register } from './auth.actions';

export interface AuthStateModel {
  token: string | null;
  user: any; // define an interface if needed
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: localStorage.getItem(environment.tokenKey),
    user: null,
    isAuthenticated: !!localStorage.getItem(environment.tokenKey),
    loading: false,
    error: null
  }
})
@Injectable()
export class AuthState {
  constructor(private http: HttpClient) {}

  // Selectors
  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static getToken(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  @Selector()
  static getError(state: AuthStateModel): string | null {
    return state.error;
  }

  // Actions
  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    ctx.patchState({ loading: true, error: null });

    return this.http.post(`${environment.baseUrl}/User/login`, action.credentials).pipe(
      tap((response: any) => {
        if (response?.token) {
          localStorage.setItem(environment.roleKey, response.role);
          localStorage.setItem(environment.tokenKey, response.token);
          ctx.patchState({
            token: response.token,
            isAuthenticated: true,
            loading: false,
            error: null
          });
        } else {
          ctx.patchState({ loading: false, error: 'Invalid login response' });
        }
      }),
      catchError((error) => {
        ctx.patchState({
          loading: false,
          error: error?.error?.message || 'Login failed'
        });
        return of(error); // Prevents breaking the observable chain
      })
    );
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    ctx.patchState({ loading: true, error: null });

    return this.http.post(`${environment.baseUrl}/User/register`, action.data).pipe(
      tap(() => {
        ctx.patchState({ loading: false, error: null });
      }),
      catchError((error) => {
        ctx.patchState({
          loading: false,
          error: error?.error?.message || 'Registration failed'
        });
        return of(error);
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    localStorage.removeItem(environment.tokenKey);
    ctx.setState({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null
    });
  }
}

// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from '../stores/states/auth/auth.state';
import { PatientState } from '../stores/states/patient/patient.state';
import { DoctorState } from '../stores/states/doctor/doctor.state';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { VisitTypeState } from '../stores/states/visittype/visit-type.state';
import { FeeScheduleState } from '../stores/states/fee-schedule/fee-schedule.state';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), 
    importProvidersFrom(
      NgxsModule.forRoot([AuthState, PatientState, DoctorState, VisitTypeState, FeeScheduleState])
    ),
      {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, provideAnimationsAsync()
  ]
};

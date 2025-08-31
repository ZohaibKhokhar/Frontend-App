import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './dashboard/doctors/doctors.component';
import { AddDoctorComponent } from './dashboard/doctors/add-doctor/add-doctor.component';
import { PatientsComponent } from './dashboard/patients/patients.component';
import { AddPatientComponent } from './dashboard/patients/add-patient/add-patient.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { PatientVisitComponent } from './dashboard/patient-visit/patient-visit.component';
import { VisitTypeComponent } from './dashboard/visit-type/visit-type.component';
import { AddVisitTypeComponent } from './dashboard/visit-type/add-visit-type/add-visit-type.component';
import { AddPatientVisitComponent } from './dashboard/patient-visit/add-patient-visit/add-patient-visit.component';
import { ReceptionistDashboardComponent } from './receptionist-dashboard/receptionist-dashboard.component';
import { FeeScheduleComponent } from './dashboard/fee-schedule/fee-schedule.component';
export const routes: Routes = [
    {
        path:'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: 'Admin' }
    },
    {
        path:'receptionist-dashboard',
        component: ReceptionistDashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: 'Receptionist' }
    },
    {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
    },
    {
        path:'doctors',
        component:DoctorsComponent,
        canActivate: [AuthGuard],
        data: { roles: 'Admin' }
    },
    {
        path:'doctors/add',
        component:AddDoctorComponent,
        canActivate: [AuthGuard],
        data: { roles: 'Admin' }
    },
    {
        path:'doctors/update/:id',
        component:AddDoctorComponent,
        canActivate: [AuthGuard],
        data: { roles: 'Admin' }
    },
    {
        path:'patients',
        component:PatientsComponent,
        canActivate: [AuthGuard],
        data: { roles: 'Admin' }
    },
    {
        path:'patients/add',
        component:AddPatientComponent,
        canActivate: [AuthGuard],
        data: { roles: 'Admin' }
    },
    {
        path:'patients/update/:id',
        component:AddPatientComponent,
        canActivate: [AuthGuard],
        data: { roles: 'Admin' }
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'patientvisits',
        component: PatientVisitComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin', 'Receptionist'] }
    },
    {
        path: 'patient-visits/add',
        component: AddPatientVisitComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin', 'Receptionist'] }
    },
    {
       path:'visit-types',
       component: VisitTypeComponent,
       canActivate: [AuthGuard],
       data: { roles: ['Admin', 'Receptionist'] }
    },
    {
        path: 'visit-types/add',
        component: AddVisitTypeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin', 'Receptionist'] }
    },
    {
        path: 'visit-types/update/:id',
        component: AddVisitTypeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin', 'Receptionist'] }
    },
    {
        path: 'patient-visits/update/:id',
        component: AddPatientVisitComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin', 'Receptionist'] }
    },
    {
        path:'fee-schedule',
        component: FeeScheduleComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Admin', 'Receptionist'] }
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }

];

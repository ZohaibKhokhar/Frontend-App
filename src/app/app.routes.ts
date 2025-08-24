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
export const routes: Routes = [
    {
        path:'dashboard',
        component: DashboardComponent
    }
    ,
    {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
    },
    {
        path:'doctors',
        component:DoctorsComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'doctors/add',
        component:AddDoctorComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'doctors/update/:id',
        component:AddDoctorComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'patients',
        component:PatientsComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'patients/add',
        component:AddPatientComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'patients/update/:id',
        component:AddPatientComponent,
        canActivate: [AuthGuard]
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
        canActivate: [AuthGuard]
    },
    {
        path: 'patient-visits/add',
        component: AddPatientVisitComponent,
        canActivate: [AuthGuard]
    },
    {
       path:'visit-types',
       component: VisitTypeComponent,
       canActivate: [AuthGuard]
    },
    {
        path: 'visit-types/add',
        component: AddVisitTypeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'visit-types/update/:id',
        component: AddVisitTypeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'patient-visits/update/:id',
        component: AddPatientVisitComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }

];

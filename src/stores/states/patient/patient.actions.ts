// patient.actions.ts
import { PatientCreate } from '../../../models/patient/patient-create.model';



export class GetPatients {
  static readonly type = '[Patient] Get All';
}

export class GetPatientById {
  static readonly type = '[Patient] Get By Id';
  constructor(public id: number) {}
}

export class AddPatient {
  static readonly type = '[Patient] Add';
  constructor(public payload: PatientCreate) {}
}

export class UpdatePatient {
  static readonly type = '[Patient] Update';
  constructor(public id: number, public payload: PatientCreate) {}
}

export class DeletePatient {
  static readonly type = '[Patient] Delete';
  constructor(public id: number) {}
}
